import Glyph from "owp.glyphicons";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const App = () => {
    const [tests, setTests] = useState([]);
    const [results, setResults] = useState({});
    const [isRunning, setIsRunning] = useState();

    useEffect(() => {
        loadAllTests();
        // loadTests(["max", "pow"]);
    }, []);

    /* eslint-disable-next-line no-unused-vars */
    const loadAllTests = () => {
        const ctx = require.context("./tests", true, /.js/);
        const tests = ctx.keys().map(key => ctx(key).default);
        setTests(tests);
    }

    /* eslint-disable-next-line no-unused-vars */
    const loadTests = (names) => {
        if (typeof names === "string") {
            names = [names];
        }
        const tests = names.map(n => require("./tests/" + n + ".js").default);
        setTests(tests);
    }

    const runAllTests = () => {
        let i = -1;
        const runNextTest = () => {
            ++i;
            if (i < tests.length) {
                const test = tests[i];
                setIsRunning(test.name);
                setTimeout(() => {
                    const result = test.run();
                    results[test.name] = result;
                    setResults(results);
                    runNextTest();
                }, 0);
            }
            else {
                setIsRunning(null);
            }
        };
        runNextTest();
    }

    const runTest = (test) => {
        setIsRunning(test.name);
        setTimeout(() => {
            const result = test.run();
            results[test.name] = result;
            setResults(results);
            setIsRunning(null);
        }, 0);
    }

    const renderTestCase = (tc, tcTime, fastestTime) => {
        let time, delta, slower;
        if (tcTime !== undefined) {
            time = Math.round(tcTime);
            delta = Math.round(tcTime - fastestTime);
            slower = Math.round((tcTime / fastestTime - 1) * 100);
        }
        return (
            <tr key={tc.name}>
                <td
                    title={tc.callback.toString()}
                    style={{ minWidth: "35%" }}>
                    {tc.name}
                </td>
                <td>{time}</td>
                <td>{delta}</td>
                <td>{slower}</td>
            </tr>
        );
    }

    const renderTestCases = (testCases, result) => {
        let fastestTime;
        const times = {};
        if (result.length) {
            result.forEach(r => {
                times[r.name] = r.time
            });
            testCases.sort((a, b) => {
                return times[a.name] - times[b.name];
            });
            fastestTime = times[testCases[0].name];
        }
        return testCases.map(tc =>
            renderTestCase(tc, times[tc.name], fastestTime)
        );
    }

    const renderTest = (test) => {
        const result = results[test.name] || [];
        const spin = isRunning === test.name;
        return (
            <table key={test.name} className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>
                            <Glyph
                                type={"refresh" + (spin ? " spin" : "") + (isRunning && !spin ? " disabled" : "")}
                                title={"Run test: " + test.name}
                                //Can't run more than one test at once.
                                onClick={isRunning ? null : () => runTest(test)}
                            />
                            &nbsp;
                            <span title={`${test.name}\n${test.repeats} repeats`}>
                                {test.name + " X " + test.repeats}
                            </span>
                        </th>
                        <th title="Median time X number of repeats">Time (ms)</th>
                        <th>Delta (ms)</th>
                        <th>Slower (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTestCases(test.testCases, result)}
                </tbody>
            </table>
        );
    }

    return (
        <div style={{ padding: 20 }}>
            <button
                className="btn btn-dark"
                disabled={!!isRunning}
                onClick={runAllTests}
            >
                Run all tests
            </button>
            {tests.map(renderTest)}
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
);