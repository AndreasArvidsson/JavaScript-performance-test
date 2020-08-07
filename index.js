import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
    const [result, setResult] = useState([]);

    const runTest = (test) => {
        const result = test.run();
        result.sort((a, b) => a.time - b.time);
        return { test, result };
    }

    /* eslint-disable-next-line no-unused-vars */
    const runAllTests = () => {
        const ctx = require.context("./tests", true, /.js/);
        const tests = ctx.keys().map(key => ctx(key).default);
        const res = tests.map(runTest);
        setResult(res);
    }

    /* eslint-disable-next-line no-unused-vars */
    const runTests = (names) => {
        if (typeof names === "string") {
            names = [names];
        }
        const tests = names.map(n => require("./tests/" + n + ".js").default);
        const res = tests.map(runTest);
        setResult(res);
    }

    useEffect(() => {
        runAllTests();
        // runTests(["max"]);
        // runTests(["max", "abs", "maxAbs", "pow"]);
    }, []);

    const renderTestCase = (testCase, fastestTime) => {
        const title = testCase.callback.toString();
        return (
            <tr key={testCase.name}>
                <td title={title}>{testCase.name}</td>
                <td>{Math.round(testCase.time)}</td>
                <td>{Math.round(testCase.time - fastestTime)}</td>
                <td>{Math.round((testCase.time / fastestTime - 1) * 100)}</td>
            </tr>
        );
    }

    const renderTestCases = (testCases) => {
        if (!testCases.length) {
            return null;
        }
        const fastestTime = testCases[0].time;
        return testCases.map(testCase =>
            renderTestCase(testCase, fastestTime)
        );
    }

    const renderTest = (testResult) => {
        return (
            <table key={testResult.test.name} className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th style={{ width: "30%" }}>
                            {testResult.test.name + " X " + testResult.test.repeats}
                        </th>
                        <th title="Median time X number of repeats">Time (ms)</th>
                        <th>Delta (ms)</th>
                        <th>Slower (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTestCases(testResult.result)}
                </tbody>
            </table>
        );
    }

    return (
        <div style={{ padding: 20 }}>
            {result.map(renderTest)}
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
);