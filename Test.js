
class Test {

    constructor(name) {
        this.name = name;
        this.tests = [];
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
        const result = this.tests.map(testCase => {
            const t1 = window.performance.now();
            const returnValue = testCase.callback(this.context);
            const time = window.performance.now() - t1;
            return {
                name: testCase.name,
                returnValue,
                time
            };
        })
        if (this.postCallback) {
            this.postCallback(result);
        }
        return result;
    }
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
    console.log("Return value: ", returnValue);
    return returnValue;
}

export default Test;
export { randomFloat, randomInt, validateReturnValueEquals };