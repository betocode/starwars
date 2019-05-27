import React, { Component } from "react";
import SearchBar from "../components/SearchBar";
import SearchResult from "../components/SearchResult";
import Intro from "../components/Intro";
import axios from "axios";

export default class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      randomNumber: null,
      result: [],
      films: [],
      quantity: null,
      movies: [],
      loading: true,
      disabled: false
    };
    this.makeRandom = this.makeRandom.bind(this);
  }
  // Define o numero aleatorioda pesquisa
  makeRandom = () => {
    let min = 0;
    let max = this.state.quantity;
    let secondRandom = Math.ceil(Math.random() * (+max - +min)) + +min;
    return secondRandom;
  };

  // Define o numero de planetas
  componentDidMount() {
    axios
      .get(`https://swapi.co/api/planets/`)
      .then(res => {
        this.setState({
          quantity: res.data.count
        });
      })
      // gera o primeiro planeta para a consulta
      .then(() => {
        let random = this.makeRandom();
        this.setState({
          randomNumber: random
        });
      });
  }

  // Pesquisa o planeta iniciado no componentdidmount
  findPlanet = async e => {
    // Adiciona a classe show__result com animação e muda o texto no butão
    const button = document.getElementById("btn");
    button.innerText = "GATHERING INFO...";
    const search = document.getElementById("search_result");
    search.classList.add("show__result");
    e.preventDefault();
    // Reseta o estado para adicionar os valores após consulta da API
    this.setState({
      movies: [],
      loading: true,
      disabled: true
    });
    // Realiza a consulta baseada no estado randomNumber
    await axios
      .get(`https://swapi.co/api/planets/${this.state.randomNumber}`)
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
          // esse novo número sera guardado para a próxima consulta
          .then(() => {
            let random = this.makeRandom();
            setTimeout(() => {
              search.classList.remove("show__result");
              button.innerText = "GET PLANET!";
              this.setState({
                loading: false,
                disabled: false,
                randomNumber: random
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
