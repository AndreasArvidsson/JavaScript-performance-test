import Test, { randomInt, validateReturnValueEquals } from "../Test";

const length = 10000000;
const test = new Test(`Local var (${length})`);
const data = randomInt(length);

test.pre(ctx => {
    ctx.data = data;
});

test.post(validateReturnValueEquals);

test.add("global data", () => {
    let sum = 0;
    for (let i = 0; i < data.length; ++i) {
        sum += data[i];
    }
    return sum;
});

test.add("context.data", ctx => {
    let sum = 0;
    for (let i = 0; i < ctx.data.length; ++i) {
        sum += ctx.data[i];
    }
    return sum;
});

test.add("local data", ctx => {
    const data = ctx.data;
    let sum = 0;
    for (let i = 0; i < data.length; ++i) {
        sum += data[i];
    }
    return sum;
});

test.add("local data, length", ctx => {
    const data = ctx.data;
    const length = data.length;
    let sum = 0;
    for (let i = 0; i < length; ++i) {
        sum += data[i];
    }
    return sum;
});

export default test;