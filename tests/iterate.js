import Test, { randomInt } from "../Test";

const length = 10000000;
const length2 = length / 10;
const test = new Test(`Iterate (${length})`);

test.pre(ctx => {
    ctx.data = randomInt(length);
    ctx.data2 = randomInt(length2);
});

test.add("for ++i", ctx => {
    const data = ctx.data;
    let sum = 0;
    for (let i = 0; i < data.length; ++i) {
        sum += data[i];
    }
    return sum;
});

test.add("for i++", ctx => {
    const data = ctx.data;
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
        sum += data[i];
    }
    return sum;
});

test.add("for --i", ctx => {
    const data = ctx.data;
    let sum = 0;
    for (let i = data.length - 1; i > -1; --i) {
        sum += data[i];
    }
    return sum;
});

test.add("forEach", ctx => {
    const data = ctx.data;
    let sum = 0;
    data.forEach(value => {
        sum += value;
    });
    return sum;
});

test.add("for in (1/10 length)", ctx => {
    const data = ctx.data2;
    let sum = 0;
    for (let i in data) {
        sum += data[i];
    }
    return sum;
});

test.add("for of (1/10 length)", ctx => {
    const data = ctx.data2;
    let sum = 0;
    for (let value of data) {
        sum += value;
    }
    return sum;
});

export default test;