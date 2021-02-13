import { render, FunctionComponent, h } from "preact";

import { Dialog, useDialog } from "./Dialog.js";

const App: FunctionComponent = () => {
  const { ref, close, open } = useDialog();

  return (
    <div>
      <h1>hoge!</h1>

      <Dialog customRef={ref} onClose={close}>
        <h1>modal!</h1>
        <div style={{ width: 300, height: 200, background: "#ccc" }}></div>
        <button type="button">hoge</button>
        <button type="button">fuga</button>
        <button type="button">piyo</button>
      </Dialog>

      <button type="button" onClick={open}>
        OPEN!
      </button>
    </div>
  );
};

render(<App />, document.body);
