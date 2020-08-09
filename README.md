# JavaScript performance test
Define test suites and cases to evaluate JS performance.

* Each test cases is run 10 times (can be configures with the `repeats` argument)
* Median time multiplied with number of `repeats` is reported back

## Try it
https://andreasarvidsson.github.io/JavaScript-performance-test/

## Usage
### 1) Define new tests in `tests` directory.

```js
// Import Test constructor and useful utility functions.
import Test, { randomInt, validateReturnValueEquals } from "../Test";

// Create a new instance of Test with a given name. 
// Repeats defaults to 10.
const test = new Test(`Max (${length})`, repeats = 10);

// pre callback is called BEFORE any test cases are run and is used to setup the test context.
test.pre(ctx => {
    ctx.data = randomInt(length);
});

// post callback is callad AFTER all test cases and is used for cleanup or to evaluate results.
test.post((results, ctx) => {
    validateReturnValueEquals(results);
});

// Add any number of test cases. Callback is run and timed.
test.add("Math.max", ctx => {
    const data = ctx.data;
    let res = 0;
    for (let i = 0; i < data.length; ++i) {
        res = Math.max(res, data[i]);
    }
    return res;
});

// Export test instance.
export default test;
```

Available utility functions.
* randomInt: `function(length: number) => [number]`
* randomFloat: `function(length: number) => [number]`
* validateReturnValueEquals: `function(results) => throws error if return value is different`

### 2) Configure which tests are loaded/available run in `index.js`
```js
// Load all tests in tests directory.
useEffect(() => {
    loadAllTests();
}, []);

// Load only named(by file name) tests.
useEffect(() => {
    loadTests(["max", "pow"]);
}, []);
```