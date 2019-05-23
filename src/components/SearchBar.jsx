import React, { Component } from "react";

export default class SearchBar extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const {finder,quantity,change} = this.props
    return (
      <React.Fragment>
        <div className="search">
          <h1>Star Wars</h1>
          <form onSubmit={finder}>
            <div className='form__group'>
            <label>
              Escolha um planeta do universo StarWars de 1 a{" "}
              {quantity}
            </label>
            <input
              onBlur={change}
              type="number"
              min="1"
              max={quantity}
            />
            </div>
            <button type="Submit" className="btn">
              Pesquisar
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
