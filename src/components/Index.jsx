import React, { Component } from "react";
import SearchBar from "../components/SearchBar";
import SearchResult from "../components/SearchResult";
import Intro from "../components/Intro";
import axios from "axios";

export default class Index extends Component {
  state = {
    randomNumber: null,
    result: [],
    films: [],
    quantity: null,
    movies: [],
    loading: true,
    disabled: false
  };

  // Define o numero de planetas
  componentDidMount() {
    axios
      .get(`https://cors-anywhere.herokuapp.com/https://swapi.co/api/planets/`)
      .then(res => {
        this.setState({
          quantity: res.data.count
        });
      })
      .then(() => {
        let min = 1;
        let max = this.state.quantity;
        let random = Math.floor(Math.random() * (+max - +min)) + +min;
        this.setState({
          randomNumber: random
        });
      });
  }

  // Pesquisa o planeta iniciado no componentdidmount
  findPlanet = async e => {
    console.log(this.state.randomNumber);
    const button = document.getElementById("btn");
    button.innerText = "GATHERING INFO...";
    // Adiciona a classe show__result com animação
    const search = document.getElementById("search_result");
    search.classList.add("show__result");
    e.preventDefault();
    // Reseta a array de filmes obtidos pela consulta e reseta o loading
    this.setState({
      movies: [],
      loading: true,
      disabled: true
    });
    await axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://swapi.co/api/planets/${
          this.state.randomNumber
        }`
      )
      .then(res => {
        this.setState({
          result: res.data,
          films: res.data.films
        });
        /* Logo após obter o resultado da consulta do planeta, 
        realizar um map para consultar cada endpoint contido no estado films */
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
          //após obter todas as informações, mudar o loading e remover a classe com a animação e sortear um novo número
          .then(() => {
            let min = 0;
            let max = this.state.quantity;
            let secondRandom = Math.ceil(Math.random() * (+max - +min)) + +min;
            setTimeout(() => {
              search.classList.remove("show__result");
              button.innerText = "GET PLANET!";
              this.setState({
                loading: false,
                disabled: false,
                randomNumber: secondRandom
              });
            }, 600);
          });
      });
  };

  render() {
    return (
      <React.Fragment>
        <div id="main">
          {this.state.quantity === null ? (
            <div>loading...</div>
          ) : (
            <div className="main__box">
              <div>
                <SearchBar
                  finder={this.findPlanet.bind(this)}
                  quantity={this.state.quantity}
                  disabled={this.state.disabled}
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
          )}
        </div>
      </React.Fragment>
    );
  }
}
