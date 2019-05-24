import React from "react";

const SearchResult = props => {
  const { result, movies, loading } = props;

  return (
    <React.Fragment>
      <div className="card">
        <div className="card__header starwars">
          <h1> {result.name} </h1>
        </div>
        <div className="card__body">
          <ul>
            <li>
              POPULATION: 
              {result.population
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </li>
            <li>CLIMATE: {result.climate}</li>
            <li>TERRAIN: {result.terrain}</li>
          </ul>
        </div>
        <div className="card__footer">
          {result.films.length === 1 ? (
            <h2 className="starwars">{result.films.length} Movie</h2>
          ) : (
            <h2 className="starwars">{result.films.length} Movies</h2>
          )}
          {loading === true ? (
            <div>Loading...</div>
          ) : (
            <ul>
              {movies.length === 0 ? (
                <li>Not found in any movie</li>
              ) : (
                movies.map((item, id) => <li key={id}>{item}</li>)
              )}
            </ul>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SearchResult;
