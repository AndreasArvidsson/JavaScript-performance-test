import Test, { randomInt, validateReturnValueEquals } from "../Test";

const length = 100000000;
const test = new Test(`Max (${length})`);

test.pre(context => {
    context.data = randomInt(length);
});

test.post(validateReturnValueEquals);

test.add("Math.max", context => {
    const data = context.data;
    let max = 0;
    for (let i = 0; i < data.length; ++i) {
        max = Math.max(max, data[i]);
    }
    return max;
});

test.add("if (value > max)", context => {
    const data = context.data;
    let max = 0;
    for (let i = 0; i < data.length; ++i) {
        if (data[i] > max) {
            max = data[i];
        }
    }
    return max;
});

export default test;