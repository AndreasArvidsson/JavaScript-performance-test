import Test, { randomInt, validateReturnValueEquals } from "../Test";

const length = 10000000;
const test = new Test(`Max (${length})`);

const Obj = {
    max: Math.max
}

const max = Math.max;

test.pre(ctx => {
    ctx.data = randomInt(length);
});

test.post(validateReturnValueEquals);

test.add("Math.max", ctx => {
    const data = ctx.data;
    let res = 0;
    for (let i = 0; i < data.length; ++i) {
        res = Math.max(res, data[i]);
    }
    return res;
});

test.add("local Math.max", ctx => {
    const data = ctx.data;
    const max = Math.max;
    let res = 0;
    for (let i = 0; i < data.length; ++i) {
        res = max(res, data[i]);
    }
    return res;
});

test.add("global max(res, value)", ctx => {
    const data = ctx.data;
    let res = 0;
    for (let i = 0; i < data.length; ++i) {
        res = max(res, data[i]);
    }
    return res;
});

test.add("global Obj.max(res, value)", ctx => {
    const data = ctx.data;
    let res = 0;
    for (let i = 0; i < data.length; ++i) {
        res = Obj.max(res, data[i]);
    }
    return res;
});

test.add("value > res ? value : res", ctx => {
    const data = ctx.data;
    let res = 0;
    for (let i = 0; i < data.length; ++i) {
        res = data[i] > res ? data[i] : res;
    }
    return res;
});


test.add("if (value > res)", ctx => {
    const data = ctx.data;
    let res = 0;
    for (let i = 0; i < data.length; ++i) {
        if (data[i] > res) {
            res = data[i];
        }
    }
    return res;
});

export default test;