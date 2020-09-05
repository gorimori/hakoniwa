export type ID = string;
type Created = string;
type Label = string;
type TaskStatus = "idle" | "doing" | "done";

export type Task = Readonly<{
  id: ID;
  created: Created;
  label: Label;
  status: TaskStatus;
}>;

export const createTask = (label: Label): Task => {
  return {
    id: Date.now().toFixed(),
    created: Date.now().toFixed(),
    label,
    status: "idle",
  };
};
