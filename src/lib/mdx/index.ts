import type { MDXComponents, MDXRemoteOptions } from 'next-mdx-remote-client/rsc';

import { UnsafeMdxError } from './unsafe-mdx-error';

export { UnsafeMdxError } from './unsafe-mdx-error';

type HtmlElementName = Extract<keyof HTMLElementTagNameMap, string>;

const ALLOWED_HTML_ELEMENTS = [
  'a',
  'blockquote',
  'br',
  'cite',
  'code',
  'del',
  'em',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'hr',
  'img',
  'kbd',
  'li',
  'mark',
  'ol',
  'p',
  'pre',
  'strong',
  'sub',
  'sup',
  'table',
  'tbody',
  'td',
  'th',
  'thead',
  'tr',
  'u',
  'ul',
] as const satisfies readonly HtmlElementName[];

const allowedHtmlElements: ReadonlySet<HtmlElementName> = new Set(ALLOWED_HTML_ELEMENTS);

const isAllowedHtmlElement = (name: string): name is HtmlElementName =>
  allowedHtmlElements.has(name as HtmlElementName);

type RemarkPlugin = NonNullable<
  NonNullable<MDXRemoteOptions['mdxOptions']>['remarkPlugins']
>[number];

type MdxOptions = NonNullable<MDXRemoteOptions['mdxOptions']>;

type MdxComponentName<Components extends MDXComponents> = Extract<keyof Components, string>;

const isAllowedUrl = (url: string): boolean => {
  const normalizedUrl = [...url].filter((character) => character.charCodeAt(0) > 32).join('');
  const scheme = normalizedUrl.match(/^([a-z][a-z\d+.-]*):/i)?.[1]?.toLowerCase();

  return scheme === undefined || scheme === 'http' || scheme === 'https' || scheme === 'mailto';
};

const assertSafeUrl = (url: string): void => {
  if (!isAllowedUrl(url)) {
    throw new UnsafeMdxError(`URL scheme is not allowed: ${url}`);
  }
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const assertSafeAttributes = (node: Record<string, unknown>, name: string): void => {
  const { attributes } = node;
  if (attributes === undefined) {
    return;
  }
  if (!Array.isArray(attributes)) {
    throw new UnsafeMdxError(`Invalid attributes on ${name}`);
  }

  for (const attribute of attributes) {
    if (
      !isRecord(attribute) ||
      attribute.type !== 'mdxJsxAttribute' ||
      typeof attribute.name !== 'string' ||
      (attribute.value !== null &&
        attribute.value !== undefined &&
        typeof attribute.value !== 'string')
    ) {
      throw new UnsafeMdxError(`Expression attributes are not allowed on ${name}`);
    }

    const attributeName = attribute.name.toLowerCase();
    if (
      attributeName.startsWith('on') ||
      attributeName === 'style' ||
      attributeName === 'dangerouslysetinnerhtml'
    ) {
      throw new UnsafeMdxError(`Attribute is not allowed on ${name}: ${attribute.name}`);
    }

    if (
      typeof attribute.value === 'string' &&
      ((name === 'a' && attributeName === 'href') ||
        (name === 'img' && attributeName === 'src') ||
        (name === 'CustomLink' && attributeName === 'href') ||
        (name === 'InnerLink' && attributeName === 'uri'))
    ) {
      assertSafeUrl(attribute.value);
    }
  }
};

const assertSafeNode = (node: unknown, allowedMdxComponents: ReadonlySet<string>): void => {
  if (!isRecord(node) || typeof node.type !== 'string') {
    throw new UnsafeMdxError('Invalid MDX AST node');
  }

  if (
    node.type === 'mdxjsEsm' ||
    node.type === 'mdxFlowExpression' ||
    node.type === 'mdxTextExpression'
  ) {
    throw new UnsafeMdxError(`MDX syntax is not allowed: ${node.type}`);
  }

  if (node.type === 'link' || node.type === 'image' || node.type === 'definition') {
    if (typeof node.url !== 'string') {
      throw new UnsafeMdxError(`Invalid URL on ${node.type}`);
    }
    assertSafeUrl(node.url);
  }

  if (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') {
    const { name } = node;
    if (
      typeof name !== 'string' ||
      (!allowedMdxComponents.has(name) && !isAllowedHtmlElement(name))
    ) {
      throw new UnsafeMdxError(`MDX component is not allowed: ${name ?? 'fragment'}`);
    }

    assertSafeAttributes(node, name);
  }

  const { children } = node;
  if (children === undefined) {
    return;
  }
  if (!Array.isArray(children)) {
    throw new UnsafeMdxError(`Invalid children on ${node.type}`);
  }

  for (const child of children) {
    assertSafeNode(child, allowedMdxComponents);
  }
};

const createAllowedMdxComponents = <const Components extends MDXComponents>(
  components: Readonly<Components>,
): ReadonlySet<MdxComponentName<Components>> =>
  new Set(Object.keys(components) as MdxComponentName<Components>[]);

export const createRemarkValidateMdx = <const Components extends MDXComponents>(
  components: Readonly<Components>,
) => {
  const allowedMdxComponents = createAllowedMdxComponents(components);

  return (() =>
    (tree: unknown): void => {
      assertSafeNode(tree, allowedMdxComponents);
    }) satisfies RemarkPlugin;
};

export const createSafeMdxOptions = <const Components extends MDXComponents>(
  mdxOptions: Readonly<MdxOptions>,
  components: Readonly<Components>,
): MDXRemoteOptions => ({
  disableExports: true,
  disableImports: true,
  mdxOptions: {
    ...mdxOptions,
    remarkPlugins: [...(mdxOptions.remarkPlugins ?? []), createRemarkValidateMdx(components)],
  },
});
