"use strict";
const sleep = (ms) => {
    return new Promise((res) => setTimeout(res, ms));
};
let c = 0;
const getServerResource = async () => {
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
async function* polling(f, intervalMS) {
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
