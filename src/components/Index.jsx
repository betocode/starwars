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
    quantity: null,
    movies: [],
    loading: true
  };
  changeText = e => {
    this.setState({
      searchText: e.target.value
    });
  };
  // Define o numero de planetas
  componentDidMount() {
    axios
      .get(`https://cors-anywhere.herokuapp.com/https://swapi.co/api/planets/`)
      .then(res => {
        this.setState({
          quantity: res.data.count
        });
      });
  }
  // pesquisa o planeta definido no input e guarda o resultado no estado
  findPlanet = async e => {
    e.preventDefault();
    this.setState({
      movies: [],
      loading: true
    });
    await axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://swapi.co/api/planets/${
          this.state.searchText
        }`
      )
      .then(res => {
        this.setState({
          result: res.data,
          films: res.data.films
        });

        axios
          .all(
            this.state.films.map(result =>
              axios.get(result).then(res => {
                console.log(res.data);
                this.setState({
                  movies: [...this.state.movies, res.data.title]
                });
              })
            )
          )
          .then(
            this.setState({
              loading: false
            })
          );
      });
  };
  stateReset() {
    if (this.state.movies.length > 0) {
      this.setState({
        movies: []
      });
    }
  }
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
              {this.state.result.length === 0 ? (
                <Intro />
              ) : (
                <SearchResult
                  loading={this.state.loading}
                  result={this.state.result}
                  movies={this.state.movies}
                />
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
