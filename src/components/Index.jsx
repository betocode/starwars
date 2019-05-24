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

  // Coleta o valor de referencia do planeta
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

  // Pesquisa o planeta definido no input e guarda o resultado no estado
  findPlanet = async e => {
    // Adiciona a classe show__result e remove ela assim que recebe o ultimo
    const search = document.getElementById("search_result");
    search.classList.add("show__result");
    e.preventDefault();
    // Reseta a array de filmes obtidos pela consulta e reseta o loading
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
        // Logo após obter o resultado da consulta do planeta, realizar um map para consultar cada endpoint contido no estado films
        axios
          .all(
            this.state.films.map(result =>
              axios.get(result).then(res => {
                this.setState({
                  movies: [...this.state.movies, res.data.title]
                });
              })
            )
          )
          // logo após obter todas as informações, mudar o loading e remover a classe com a animação
          .then(() => {
            search.classList.remove("show__result");
            this.setState({
              loading: false
            });
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
            <div id="search_result" className="result">
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
