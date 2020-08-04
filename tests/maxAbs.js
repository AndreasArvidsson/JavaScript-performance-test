import Test, { randomFloat, validateReturnValueEquals } from "../Test";

const length = 100000000;
const test = new Test(`Max abs (${length})`);

test.pre(context => {
    context.data = randomFloat(length);
});

test.post(validateReturnValueEquals);

test.add("Math.max(Math.abs)", context => {
    const data = context.data;
    let max = 0;
    for (let i = 0; i < data.length; ++i) {
        max = Math.max(max, Math.abs(data[i]));
    }
    return max;
});

test.add("if (value > valueMax)", context => {
    const data = context.data;
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