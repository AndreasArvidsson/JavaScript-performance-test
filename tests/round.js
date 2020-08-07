import Test, { randomFloat } from "../Test";

const length = 10000000;
const test = new Test(`Round (${length})`);

test.pre(ctx => {
    ctx.data = randomFloat(length);
});

test.add("local Math.round", ctx => {
    const round = Math.round;
    const data = ctx.data;
    let sum = 0;
    for (let i = 0; i < data.length; ++i) {
        sum += round(data[i]);
    }
    return sum;
});

test.add("local Math.ceil", ctx => {
    const ceil = Math.ceil;
    const data = ctx.data;
    let sum = 0;
    for (let i = 0; i < data.length; ++i) {
        sum += ceil(data[i]);
    }
    return sum;
});

test.add("local Math.floor", ctx => {
    const floor = Math.floor;
    const data = ctx.data;
    let sum = 0;
    for (let i = 0; i < data.length; ++i) {
        sum += floor(data[i]);
    }
    return sum;
});

test.add("local Math.trunc", ctx => {
    const trunc = Math.trunc;
    const data = ctx.data;
    let sum = 0;
    for (let i = 0; i < data.length; ++i) {
        sum += trunc(data[i]);
    }
    return sum;
});

export default test;