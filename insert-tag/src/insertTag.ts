export type Config = {
  open: string;
  close: string;
  startIndex: number;
  endIndex: number;
};

export const insertTag = (
  s: string,
  { open, close, startIndex, endIndex }: Config
): string => {
  const res = [...s];
  res.splice(endIndex, 0, close);
  res.splice(startIndex, 0, open);
  return res.join("");
};
