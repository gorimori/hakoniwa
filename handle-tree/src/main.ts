export type Tree = {
  text: string;
  children?: Tree[];
};

export type FormatterTree = {
  text: string;
  highlight: boolean;
  children?: FormatterTree[];
};

export const searchInTree = (tree: Tree) => (word: string): boolean => {
  if (tree.children === undefined) {
    return tree.text.includes(word);
  }

  if (tree.text.includes(word)) {
    return true;
  }

  return tree.children.some((subTree) => searchInTree(subTree)(word));
};

export const highlightFormatterTree = (tree: FormatterTree) => (
  predicate: (tree: FormatterTree) => boolean
): FormatterTree => {
  tree.highlight = predicate(tree);

  if (tree.children === undefined) {
    return tree;
  }

  tree.children.forEach((subTree) =>
    highlightFormatterTree(subTree)(predicate)
  );

  return tree;
};
