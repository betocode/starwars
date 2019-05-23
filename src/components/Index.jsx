import React, { Component } from "react";
import SearchBar from "../components/SearchBar";
import SearchResult from "../components/SearchResult";
import Intro from "../components/Intro";
import axios from "axios";

export default class Index extends Component {
  state = {
    searchText: null,
    result: [],
    films: [],
    quantity: null
  };
  changeText = e => {
    this.setState({
      searchText: e.target.value
    });
    console.log(this.state.searchText);
  };
  // Define o numero de planetas
  componentDidMount() {
    axios
      .get(`https://swapi.co/api/planets/?format=json`)
      .then(res => {
        this.setState({
          quantity: res.data.count
        });
      });
  }
  // pesquisa o planeta definido no input e guarda o resultado no estado
  findPlanet = e => {
    e.preventDefault();
    axios
      .get(
        `https://swapi.co/api/planets/${
          this.state.searchText
        }/?format=json`
      )
      .then(res => {
        console.log(this.state.quantity);
        console.log(this.state.searchText);
        console.log(res.data);
        this.setState({
          result: res.data
        });
      
      });
  };

  render() {
    return (
      <React.Fragment>
        <div id="main">
          <div className="main__box">
            <div>
              <SearchBar
                finder={this.findPlanet.bind(this)}
                change={this.changeText.bind(this)}
                quantity={this.state.quantity}
              />
            </div>
            <div className="result">
            { (this.state.result.length === 0)?
          ( <Intro />)
          :
          <SearchResult results={this.state.result} />
        }
            
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
