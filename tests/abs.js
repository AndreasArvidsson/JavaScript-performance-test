import Test, { randomFloat, validateReturnValueEquals } from "../Test";

const length = 10000000;
const test = new Test(`Abs (${length})`);

test.pre(ctx => {
    ctx.data = randomFloat(length);
});

test.post(validateReturnValueEquals);

test.add("Math.abs", ctx => {
    const data = ctx.data;
    let sum = 0;
    for (let i = 0; i < data.length; ++i) {
        sum += Math.abs(data[i]);
    }
    return sum;
});

test.add("local Math.abs", ctx => {
    const data = ctx.data;
    const abs = Math.abs;
    let sum = 0;
    for (let i = 0; i < data.length; ++i) {
        sum += abs(data[i]);
    }
    return sum;
});

test.add("if (value < 0)", ctx => {
    const data = ctx.data;
    let sum = 0;
    for (let i = 0; i < data.length; ++i) {
        if (data[i] < 0) {
            sum -= data[i];
        }
        else {
            sum += data[i];
        }
    }
    return sum;
});

export default test;