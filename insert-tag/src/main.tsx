import React from "react";
import ReactDOM from "react-dom";
import { insertTag } from "./insertTag";

const ENTRY_POINT_ID = "app";

const START = "<strong>";
const END = "</strong>";

const Main: React.FC = () => {
  const ref = React.useRef<HTMLTextAreaElement | null>(null);
  const [val, setVal] = React.useState("");
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setVal(e.target.value);
  };

  return (
    <div>
      <textarea ref={ref} value={val} onChange={onChange}></textarea>

      <button
        onClick={() => {
          setVal((cur) => {
            if (ref.current === null) {
              return cur;
            }
            const { selectionStart, selectionEnd, value } = ref.current;
            return insertTag(value, {
              open: "```txt\n",
              close: "\n```",
              startIndex: selectionStart,
              endIndex: selectionEnd,
            });
          });
        }}
      >
        edit
      </button>
    </div>
  );
};

const main = () => {
  const entryPoint = document.querySelector(`#${ENTRY_POINT_ID}`);
  if (entryPoint === null) {
    throw new Error(`#${ENTRY_POINT_ID}がない`);
  }

  ReactDOM.render(<Main />, entryPoint);
};

main();
