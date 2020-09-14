const sleep = (ms: number): Promise<void> => {
  return new Promise((res) => setTimeout(res, ms));
};

type Res =
  | {
      done: false;
      value: number;
    }
  | {
      done: true;
      value: string;
    };

let c = 0;
const getServerResource = async (): Promise<Res> => {
  c += 1;
  if (c < 5) {
    return {
      done: false,
      value: c,
    };
  }

  return {
    done: true,
    value: "done",
  };
};

async function* polling<T extends { done: boolean }>(
  f: () => Promise<T>,
  intervalMS: number
) {
  while (true) {
    const res = await f();
    yield res;

    if (res.done) {
      return;
    }

    await sleep(intervalMS);
  }
}

const main = async () => {
  for await (const res of polling(getServerResource, 1000)) {
    console.log(res);
  }

  console.log("fugo");
};

main();
