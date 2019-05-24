import React from "react";

const SearchBar = props => {
  const { finder, quantity, change, disabled } = props;
  return (
    <React.Fragment>
      <div className="search">
        <div id="div1">
          <div id="div2">
            <h1>Star Wars</h1>
          </div>
        </div>
        <form onSubmit={finder}>
          <div className="form__group">
            <label>
              Type in the planet from StarWars Universe from 1 to {quantity}
            </label>
            <input
              id="form__input"
              onChange={change}
              type="number"
              min="1"
              max={quantity}
            />
          </div>
          <button disabled={disabled} type="Submit" className="btn">
            SEARCH
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default SearchBar;
