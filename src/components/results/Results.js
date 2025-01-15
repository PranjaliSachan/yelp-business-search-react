import React, { useEffect, useState } from "react";
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import ResultComponent from "../result/Result";

function ResultsComponent({ searchResults }) {

    const [searchRes, updateSearchRes] = useState({
        businesses: [],
        total: 0,
        region: { longitude: 0.0, latitude: 0.0 }
    });

    useEffect(() => {
        updateSearchRes(searchResults);
    }, [searchResults]);

    return (
        <div className="w-full flex flex-row flex-wrap">
            {!searchRes && (
                <Spinner className="m-auto" size={SpinnerSize.large} />
            )}
            {searchRes.businesses && searchRes.businesses.length > 0 && (searchRes.businesses.map(r => (
                <ResultComponent result={r} />
            )))}
        </div>
    );
}

export default ResultsComponent;