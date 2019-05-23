import React, { Component } from "react";

const SearchResult = props => {
  const { result, movies, loading } = props;
  return (
    <React.Fragment>
      <div className="card">
        <div className="card__header">
          <h1>{result.name}</h1>
        </div>
        <div className="card__body">
          <ul>
            <li>
              POPULATION:
              {result.population === "unknown"
                ? result.population
                : result.population / Math.pow(10, 6) + " million"}{" "}
            </li>
            <li>CLIMATE:{result.climate}</li>
            <li>TERRAIN:{result.terrain}</li>
          </ul>
        </div>
        {loading === true ? (
          <div>Loading...</div>
        ) : (
          <div className="card__footer">
            <h2>Movies</h2>
            <ul>
              {movies.length === 0 ? (
                <li>Not found in any movie</li>
              ) : (
                movies.map((item, id) => <li key={id}>{item}</li>)
              )}
            </ul>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default SearchResult;
