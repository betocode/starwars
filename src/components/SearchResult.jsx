import React, { Component } from "react";
import axios from "axios";
import Films from "../components/Films";

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }
  /* getMovies = () => {
    let _self = this;
    axios
      .all(
        this.props.films.map(result =>
          axios.get(result).then(res => {
            console.log(res.data);
            // return <Films key={res.data.episode_id} name={res.data.title} />;
            this.setState({
              movies: [...this.state.movies, res.data.title]
            });
          })
        )
      )
      .then(
        this.setState({
          movies: []
        })
      );
  };*/

  render() {
    console.log(this.state.movies);
    const { result, movies } = this.props;
    return (
      <React.Fragment>
        <div className="card">
          <div className="card__header">
            <h1>{result.name}</h1>
          </div>
          <div className="card__body">
            <ul>
              <li>POPULAÇÃO:{result.population}</li>
              <li>CLIMA:{result.climate}</li>
              <li>TERRENO:{result.terrain}</li>
            </ul>
            <h2>Movies</h2>
            {movies.map((item, id) => (
              <p key={id}>{item}</p>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SearchResult;
