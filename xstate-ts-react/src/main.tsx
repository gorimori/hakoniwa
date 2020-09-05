import React from "react";
import ReactDOM from "react-dom";
import { Machine, assign } from "xstate";
import { useMachine } from "@xstate/react";

import { Task, createTask, ID } from "./Task";

type Context = Readonly<{
  tasks: readonly Task[];
}>;

type StateSchema = {
  states: {
    active: Record<string, unknown>;
    inactive: Record<string, unknown>;
  };
};

type Event =
  | {
      type: "ADD";
      payload: {
        task: Task;
      };
    }
  | {
      type: "DELETE";
      payload: {
        id: ID;
      };
    }
  | {
      type: "DONE";
      payload: {
        id: ID;
      };
    }
  | {
      type: "START";
      payload: {
        id: ID;
      };
    }
  | {
      type: "STOP";
    }
  | {
      type: "RESUME";
    };

const machine = Machine<Context, StateSchema, Event>(
  {
    key: "sample",
    initial: "active",
    context: {
      tasks: [],
    },
    states: {
      active: {
        on: {
          ADD: {
            actions: assign({
              tasks: (c, e) => [...c.tasks, e.payload.task],
            }),
          },
          STOP: "inactive",
        },
        activities: "log",
      },
      inactive: {
        on: {
          RESUME: "active",
        },
        after: {
          5000: "active",
        },
        exit: {
          type: "alert",
          exec: () => {
            alert("exit from inactive");
          },
        },
      },
    },
  },
  {
    activities: {
      log: () => {
        const id = setInterval(() => {
          console.log(Date.now());
        }, 3000);

        return () => {
          clearInterval(id);
        };
      },
    },
  }
);

const ENTRY_POINT_ID = "app";

const Main: React.FC = () => {
  const [state, send, service] = useMachine(machine);
  React.useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div>
      <button
        onClick={() => {
          send({
            type: "ADD",
            payload: { task: createTask(Date.now().toFixed()) },
          });
        }}
        disabled={state.value === "inactive"}
      >
        add
      </button>

      <button
        onClick={() => {
          send({
            type: "STOP",
          });
        }}
      >
        disable
      </button>

      <div>
        <pre>{JSON.stringify(state.context.tasks)}</pre>
      </div>
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
