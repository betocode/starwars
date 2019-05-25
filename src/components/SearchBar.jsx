import React from "react";

const SearchBar = props => {
  const { finder, quantity, disabled } = props;
  return (
    <React.Fragment>
      <div className="search starwars">
        <div id="div1">
          <div id="div2">
            <h1>Star Wars</h1>
          </div>
        </div>
        <form onSubmit={finder}>
          <div className="form__group">
            <label className="form__label starwars">
              Generate one of {quantity} planets from the Star Wars Universe
            </label>
          </div>
          <button id="btn" disabled={disabled} type="Submit" className="btn">
            GET PLANET!
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default SearchBar;
