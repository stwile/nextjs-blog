import { describe, expect, it } from 'vitest';

import { evaluate } from 'next-mdx-remote-client/rsc';
import remarkGfm from 'remark-gfm';

import { createRemarkValidateMdx, createSafeMdxOptions, UnsafeMdxError } from '.';

const TestComponent = () => null;

const mdxComponents = {
  CustomLink: TestComponent,
  Docswell: TestComponent,
  InnerLink: TestComponent,
  Podcast: TestComponent,
  SpeakerDeck: TestComponent,
  Twitter: TestComponent,
};

const options = createSafeMdxOptions({ remarkPlugins: [remarkGfm] }, mdxComponents);

const evaluateMdx = async (source: string) =>
  evaluate({ source, components: mdxComponents, options });

describe('safe MDX policy', () => {
  it('MarkdownとGFMを許可する', async () => {
    const result = await evaluateMdx(
      '# Heading\n\n- [x] task\n\n| name | value |\n| --- | --- |\n| foo | bar |',
    );

    expect(result.error).toBeUndefined();
  });

  it.each([
    ['CustomLink', '<CustomLink href="/about">About</CustomLink>'],
    ['Docswell', '<Docswell slideId="slide" />'],
    ['InnerLink', '<InnerLink uri="/blog" title="Blog" />'],
    ['Podcast', '<Podcast podcastId="episode" />'],
    ['SpeakerDeck', '<SpeakerDeck slideId="slide" />'],
    ['Twitter', '<Twitter tweetId="tweet" />'],
    ['cite', '<cite>Source title</cite>'],
  ])('%sを許可する', async (_name, source) => {
    const result = await evaluateMdx(source);

    expect(result.error).toBeUndefined();
  });

  it.each([
    ['blockquote', '<blockquote>Quote</blockquote>'],
    ['cite', '<cite>Source title</cite>'],
    ['a', '<a href="https://example.com">Link</a>'],
    ['p', '<p>Paragraph</p>'],
    ['br', '<br />'],
    ['em', '<em>Emphasis</em>'],
    ['strong', '<strong>Strong</strong>'],
    ['del', '<del>Deleted</del>'],
    ['code', '<code>code</code>'],
    ['pre', '<pre>preformatted</pre>'],
    ['kbd', '<kbd>Enter</kbd>'],
    ['mark', '<mark>Marked</mark>'],
    ['sub', '<sub>Subscript</sub>'],
    ['sup', '<sup>Superscript</sup>'],
    ['u', '<u>Underlined</u>'],
    ['ul', '<ul><li>Item</li></ul>'],
    ['ol', '<ol><li>Item</li></ol>'],
    [
      'table',
      '<table><thead><tr><th>Head</th></tr></thead><tbody><tr><td>Cell</td></tr></tbody></table>',
    ],
    ['hr', '<hr />'],
    ['heading', '<h1>H1</h1><h2>H2</h2><h3>H3</h3><h4>H4</h4><h5>H5</h5><h6>H6</h6>'],
    ['img', '<img src="/image.png" alt="Image" />'],
  ])('静的HTML要素%sを許可する', async (_name, source) => {
    const result = await evaluateMdx(source);

    expect(result.error).toBeUndefined();
  });

  it.each([
    ['https', '<a href="https://example.com">Link</a>'],
    ['http', '<a href="http://example.com">Link</a>'],
    ['mailto', '<a href="mailto:test@example.com">Mail</a>'],
    ['fragment', '<a href="#heading">Heading</a>'],
    ['absolute path', '<a href="/blog/article">Article</a>'],
    ['relative path', '<a href="../article">Article</a>'],
  ])('%s URLを許可する', async (_name, source) => {
    const result = await evaluateMdx(source);

    expect(result.error).toBeUndefined();
  });

  it.each([
    ['import', "import value from 'module'\n\n# Heading"],
    ['export', 'export const value = 1\n\n# Heading'],
    ['JavaScript式', '# Heading {globalThis.process}'],
    ['未許可のJSX要素', '<script>unsafe</script>'],
    ['未登録の独自コンポーネント', '<MissingComponent />'],
    ['JSX式属性', '<Docswell slideId={globalThis.process.env.SLIDE_ID} />'],
    ['イベント属性', '<a href="/" onClick="alert(1)">Link</a>'],
    ['style属性', '<p style="color: red">Paragraph</p>'],
    ['javascript URL', '<a href="javascript:alert(1)">Link</a>'],
    ['data URL', '<img src="data:image/svg+xml;base64,PHN2Zy8+" alt="Image" />'],
    ['Markdownのjavascript URL', '[Link](javascript:alert(1))'],
    ['Markdownのdata URL', '![Image](data:image/png;base64,AAAA)'],
  ])('%sを拒否する', async (_name, source) => {
    const result = await evaluateMdx(source);

    expect(result.error).toBeInstanceOf(Error);
  });

  it.each([
    ['nodeがオブジェクトではない', null],
    ['typeが文字列ではない', { type: null }],
    ['childrenが配列ではない', { children: {}, type: 'root' }],
    ['子nodeが不正', { children: [{ type: null }], type: 'root' }],
    [
      'attributesが配列ではない',
      { attributes: {}, children: [], name: 'Docswell', type: 'mdxJsxFlowElement' },
    ],
    [
      'attributeがオブジェクトではない',
      { attributes: [null], children: [], name: 'Docswell', type: 'mdxJsxFlowElement' },
    ],
  ])('不正なAST（%s）を拒否する', (_name, tree) => {
    const transform = createRemarkValidateMdx(mdxComponents)();

    expect(() => transform(tree)).toThrow(UnsafeMdxError);
  });

  it('componentsのキーを別の許可リストなしで許可する', async () => {
    const components = { TestComponent };
    const result = await evaluate({
      source: '<TestComponent />',
      components,
      options: createSafeMdxOptions({}, components),
    });

    expect(result.error).toBeUndefined();
  });
});
