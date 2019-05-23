import React from "react";

const SearchResult = (props) => {
    const {results} = props
  return (
    <React.Fragment>
      <div className="card">
        <div className="card__header">
          <h1>{results.name}</h1>
        </div>
        <div className="card__body">
          <ul>
            <li>POPULAÇÃO:{results.population}</li>
            <li>CLIMA:{results.climate}</li>
            <li>TERRENO:{results.terrain}</li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SearchResult;
