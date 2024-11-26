import { Component } from "react";
import MovieCard from "./movie-card";
export default class MovieList extends Component {
  render() {
    const { movies, handleCart, addStar, decStar, handleFav } = this.props;
    return (
      <>
        {movies.map((movie) => {
          return (
            <MovieCard
              movie={movie}
              handleCart={handleCart}
              addStar={addStar}
              decStar={decStar}
              handleFav={handleFav}
            />
          );
        })}
      </>
    );
  }
}
