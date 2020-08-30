import { insertTag, Config } from "./insertTag";

type Case = {
  readonly s: string;
  readonly config: Config;
  readonly expected: string;
};

test("insertTag", () => {
  const cases: Case[] = [
    {
      s: "hoge",
      config: {
        open: "<strong>",
        close: "</strong>",
        startIndex: 0,
        endIndex: 1,
      },
      expected: "<strong>h</strong>oge",
    },

    {
      s: "hoge",
      config: {
        open: "<strong>",
        close: "</strong>",
        startIndex: 4,
        endIndex: 4,
      },
      expected: "hoge<strong></strong>",
    },

    {
      s: "markdown",
      config: {
        open: "```txt\n",
        close: "\n```",
        startIndex: 0,
        endIndex: 8,
      },
      expected: `\`\`\`txt
markdown
\`\`\``,
    },
  ];

  cases.forEach(({ s, config, expected }) => {
    const res = insertTag(s, config);
    expect(res).toBe(expected);
  });
});
