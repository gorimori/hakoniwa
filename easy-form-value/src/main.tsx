import React from "react";
import ReactDOM from "react-dom";

const ENTRY_POINT_ID = "app";

type Field = HTMLInputElement; // | HTMLSelectElement | HTMLTextAreaElement;
type FieldName = string;

const useEasyForm = () => {
  const fieldNames = React.useRef<Set<FieldName>>(new Set());
  const map = React.useRef<Map<FieldName, Field>>(new Map());

  const register = React.useCallback(
    (input: Field) => {
      const { name } = input;
      if (fieldNames.current.has(name)) {
        throw new Error(`${name}の重複`);
      }

      fieldNames.current.add(name);
      map.current.set(name, input);
    },
    [fieldNames, map]
  );

  const getValues = React.useCallback(() => {}, [map]);
};

const Main: React.FC = () => {
  return <div ref={(element) => {}}>main</div>;
};

const main = () => {
  const entryPoint = document.querySelector(`#${ENTRY_POINT_ID}`);
  if (entryPoint === null) {
    throw new Error(`#${ENTRY_POINT_ID}がない`);
  }

  ReactDOM.render(<Main />, entryPoint);
};

main();
