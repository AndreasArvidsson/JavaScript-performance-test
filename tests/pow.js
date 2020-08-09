import Test, { randomFloat, validateReturnValueEquals } from "../Test";

const length = 10000000;
const test = new Test(`Pow (${length})`);

test.pre(ctx => {
    ctx.data = randomFloat(length);
});

test.post(validateReturnValueEquals);

test.add("Math.pow", ctx => {
    const data = ctx.data;
    let sum = 0;
    for (let i = 0; i < data.length; ++i) {
        sum += Math.pow(data[i], 2);
    }
    return sum;
});

test.add("local Math.pow", ctx => {
    const data = ctx.data;
    const pow = Math.pow;
    let sum = 0;
    for (let i = 0; i < data.length; ++i) {
        sum += pow(data[i], 2);
    }
    return sum;
});

test.add("value * value", ctx => {
    const data = ctx.data;
    let sum = 0;
    for (let i = 0; i < data.length; ++i) {
        sum += data[i] * data[i];
    }
    return sum;
});

export default test;