import Test, { validateReturnValueEquals } from "../Test";

const length = 10000000;
const test = new Test(`Func (${length})`);

function func() {
    return 1;
}

const constFunc = () => {
    return 1;
};

const arrowFunc = () => {
    return 1;
};

const ctx = {};
const bindFunc = func.bind(ctx);
const bindFuncNull = func.bind(null);

test.post(validateReturnValueEquals);

test.add("global func", () => {
    let res = 0;
    for (let i = 0; i < length; ++i) {
        res = func();
    }
    return res;
});

test.add("local func", () => {
    function func() {
        return 1;
    }
    let res = 0;
    for (let i = 0; i < length; ++i) {
        res = func();
    }
    return res;
});

test.add("global const func", () => {
    let res = 0;
    for (let i = 0; i < length; ++i) {
        res = constFunc();
    }
    return res;
});

test.add("local const func", () => {
    const constFunc = () => {
        return 1;
    };
    let res = 0;
    for (let i = 0; i < length; ++i) {
        res = constFunc();
    }
    return res;
});

test.add("global arrow func", () => {
    let res = 0;
    for (let i = 0; i < length; ++i) {
        res = arrowFunc();
    }
    return res;
});

test.add("local arrow func", () => {
    const arrowFunc = () => {
        return 1;
    };
    let res = 0;
    for (let i = 0; i < length; ++i) {
        res = arrowFunc();
    }
    return res;
});

test.add("global bind func this", () => {
    let res = 0;
    for (let i = 0; i < length; ++i) {
        res = bindFunc();
    }
    return res;
});

test.add("local bind func this", () => {
    const bindFunc = func.bind(ctx);
    let res = 0;
    for (let i = 0; i < length; ++i) {
        res = bindFunc();
    }
    return res;
});

test.add("global bind func null", () => {
    let res = 0;
    for (let i = 0; i < length; ++i) {
        res = bindFuncNull();
    }
    return res;
});

test.add("local bind func null", () => {
    const bindFuncNull = func.bind(null);
    let res = 0;
    for (let i = 0; i < length; ++i) {
        res = bindFuncNull();
    }
    return res;
});

export default test;