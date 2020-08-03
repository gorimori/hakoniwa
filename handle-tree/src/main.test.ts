import {
  Tree,
  searchInTree,
  FormatterTree,
  highlightFormatterTree,
} from "./main";

const t: Tree = {
  text: "hoge",
  children: [
    {
      text: "fuga",
    },
    {
      text: "piyo",
      children: [
        {
          text: "hogehoge",
        },
      ],
    },
    {
      text: "mogu",
    },
  ],
};

test("searchInTree", () => {
  const searchInT = searchInTree(t);

  expect(searchInT("hoge")).toBe(true);
  expect(searchInT("hogehoge")).toBe(true);
  expect(searchInT("none")).toBe(false);
});

const ft: FormatterTree = {
  text: "piyo",
  highlight: false,
  children: [
    {
      text: "mogu",
      highlight: false,
      children: [
        {
          text: "mogumogu",
          highlight: false,
        },

        {
          text: "pika",
          highlight: false,
        },
      ],
    },
    {
      text: "pika",
      highlight: false,
    },
  ],
};

const ftExpected: FormatterTree = {
  text: "piyo",
  highlight: false,
  children: [
    {
      text: "mogu",
      highlight: false,
      children: [
        {
          text: "mogumogu",
          highlight: false,
        },

        {
          text: "pika",
          highlight: true,
        },
      ],
    },

    {
      text: "pika",
      highlight: true,
    },
  ],
};

test("formatterTree", () => {
  expect(
    highlightFormatterTree(ft)((tree) => tree.text.includes("pika"))
  ).toMatchObject(ftExpected);
});
