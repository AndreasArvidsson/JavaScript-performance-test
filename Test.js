class Test {

    constructor(name, repeats = 10) {
        this.name = name;
        this.tests = [];
        this.repeats = repeats;
        this.context = {};
    }

    pre = (callback) => {
        this.preCallback = callback;
    }

    post = (callback) => {
        this.postCallback = callback;
    }

    add = (name, callback) => {
        this.tests.push({ name, callback });
    }

    run = () => {
        if (this.preCallback) {
            this.preCallback(this.context);
        }

        const returnValues = {};
        const times = {};

        for (let i = 0; i < this.repeats; ++i) {
            this.tests.forEach(tc => {
                const t0 = window.performance.now();
                const returnValue = tc.callback(this.context);
                const t1 = window.performance.now();

                if (!times[tc.name]) {
                    times[tc.name] = [];
                    returnValues[tc.name] = returnValue;
                }
                times[tc.name].push(t1 - t0);
            });
        }

        const result = this.tests.map(tc => ({
            name: tc.name,
            callback: tc.callback,
            time: median(times[tc.name]) * this.repeats,
            returnValue: returnValues[tc.name]
        }));

        if (this.postCallback) {
            this.postCallback(result, this.context);
        }

        return result;
    }
}

function median(values) {
    values.sort();
    const i = Math.floor(values.length / 2);
    //Odd number of values. Just pick the middle one.
    if (values.length % 2 === 1) {
        return values[i];
    }
    //Even number of values. Take the mean of the two in the middle.
    return (values[i - 1] + values[i]) / 2;
}

function randomFloat(length) {
    const res = new Float32Array(length);
    for (let i = 0; i < length; ++i) {
        res[i] = 2 * Math.random() - 1;
    }
    return res;
}

function randomInt(length) {
    const res = new Int32Array(length);
    for (let i = 0; i < length; ++i) {
        res[i] = Math.round(1000 * Math.random());
    }
    return res;
}

function validateReturnValueEquals(res) {
    let returnValue = null;
    res.forEach(testRes => {
        if (returnValue === null) {
            returnValue = testRes.returnValue
        }
        else if (returnValue !== testRes.returnValue) {
            throw Error(`Incorrect return value. Expected: ${returnValue}, found: ${testRes.returnValue}`);
        }
    });
    return returnValue;
}

export default Test;
export {
    randomFloat,
    randomInt,
    validateReturnValueEquals
};