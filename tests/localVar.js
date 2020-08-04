import Test, { randomInt, validateReturnValueEquals } from "../Test";

const length = 500000000;
const test = new Test(`Local var (${length})`);

test.pre(context => {
    context.data = randomInt(length);
});

test.post(validateReturnValueEquals);

test.add("context.data", context => {
    let sum = 0;
    for (let i = 0; i < context.data.length; ++i) {
        sum += context.data[i];
    }
    return sum;
});

test.add("const data", context => {
    const data = context.data;
    let sum = 0;
    for (let i = 0; i < data.length; ++i) {
        sum += data[i];
    }
    return sum;
});

test.add("const data, length", context => {
    const data = context.data;
    const length = data.length;
    let sum = 0;
    for (let i = 0; i < length; ++i) {
        sum += data[i];
    }
    return sum;
});

export default test;