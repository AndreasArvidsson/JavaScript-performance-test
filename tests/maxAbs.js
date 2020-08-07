import Test, { randomFloat, validateReturnValueEquals } from "../Test";

const length = 10000000;
const test = new Test(`Max abs (${length})`);

test.pre(ctx => {
    ctx.data = randomFloat(length);
});

test.post(validateReturnValueEquals);

test.add("Math.max(Math.abs)", ctx => {
    const data = ctx.data;
    let res = 0;
    for (let i = 0; i < data.length; ++i) {
        res = Math.max(res, Math.abs(data[i]));
    }
    return res;
});

test.add("local Math.max(Math.abs)", ctx => {
    const data = ctx.data;
    const max = Math.max;
    const abs = Math.abs;
    let res = 0;
    for (let i = 0; i < data.length; ++i) {
        res = max(res, abs(data[i]));
    }
    return res;
});

test.add("if (value > valueMax)", ctx => {
    const data = ctx.data;
    let valueMax = 0;
    let valueMin = 0;
    for (let i = 0; i < data.length; ++i) {
        if (data[i] > valueMax) {
            valueMax = data[i];
        }
        else if (data[i] < valueMin) {
            valueMin = data[i];
        }
    }
    return Math.max(valueMax, Math.abs(valueMin));
});

export default test;