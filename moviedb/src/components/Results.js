import React from "react";
import Result from "./Result";

function Results ({ results }) {
    return (
        <section className="results">
            {results.map( result => (
                <Result key={result.imbdID} result={result} />
            ))}
        </section>

    );
}

export default Results;