import React, { Component } from "react";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { finder, quantity, change } = this.props;
    return (
      <React.Fragment>
        <div className="search">
          <h1>Star Wars</h1>
          <form onSubmit={finder}>
            <div className="form__group">
              <label>
                Type in the planet from StarWars Universe from 1 to {quantity}
              </label>
              <input
                id="form__input"
                onBlur={change}
                type="number"
                min="1"
                max={quantity}
              />
            </div>
            <button type="Submit" className="btn">
              SEARCH
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
