import React from "react";
import MovieList from "./MovieList.js";
import Navbar from "./Navbar.js";
import { movies } from "./movieData.js";
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: movies,
      cartCount: 0,
    };
  }
  decStar = (movie) => {
    const movies = this.state.movies;
    let movieIndex = movies.indexOf(movie);

    // form 1
    if (movies[movieIndex].star <= 0) {
      return;
    }
    movies[movieIndex].star -= 0.5;
    this.setState({
      movies: movies,
    });
  };
  addStar = (movie) => {
    const movies = this.state.movies;
    let movieIndex = movies.indexOf(movie);

    // form 1
    if (movies[movieIndex].star >= 5) {
      return;
    }
    movies[movieIndex].star += 0.5;
    this.setState({
      movies,
    });
    // this.setState((prevState)=>{
    //     return {
    //         counter : prevState.counter + 0.5
    //     }
    // })
  };

  handleFav = (movie) => {
    const movies = this.state.movies;
    let movieIndex = movies.indexOf(movie);

    movies[movieIndex].fav = !movies[movieIndex].fav;
    this.setState({
      movies: movies,
    });
  };

  handleCart = (movie) => {
    const movies = this.state.movies;
    let movieIndex = movies.indexOf(movie);
    movies[movieIndex].isAddedToCart = !movies[movieIndex].isAddedToCart;
    this.setState({
      movies: movies,
      cartCount:
        movies[movieIndex].isAddedToCart === true
          ? this.state.cartCount + 1
          : this.state.cartCount - 1,
    });
  };

  render() {
    return (
      <>
        <Navbar cartCount={this.state.cartCount} />
        <MovieList
          movies={movies}
          handleCart={this.handleCart}
          addStar={this.addStar}
          decStar={this.decStar}
          handleFav={this.handleFav}
        />
      </>
    );
  }
}
