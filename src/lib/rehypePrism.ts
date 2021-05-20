import { Node, Parent, visit, Visitor } from 'unist-util-visit';

export function hoge() {
  const visitor = ({ node, parent }: {
    node: Node,
    parent: Parent
    }): Visitor {
    if (!parent || parent.tagName !== 'pre' || node.tagName !== 'code') {
      return;
    }

    const lang = getLanguage(node);

    if (lang === null) {
      return;
    }

    let result;
    try {
      parent.properties.className = (parent.properties.className || []).concat('language-' + lang);
      result = refractor.highlight(nodeToString(node), lang);
    } catch (err) {
      if (options.ignoreMissing && /Unknown language/.test(err.message)) {
        return;
      }
      throw err;
    }

    node.children = result;
  }

  return (tree: Node) => {
    visit(tree, 'element', visitor);
  };


};

function getLanguage(node) {
  const className = node.properties.className || [];

  for (const classListItem of className) {
    if (classListItem.slice(0, 9) === 'language-') {
      return classListItem.slice(9).toLowerCase();
    }
  }

  return null;
}
