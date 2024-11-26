import { Component } from "react";
import AnimeCard from "./AnimeCard";
// Complete the AnimeList Components
class AnimeList extends Component {
  render() {
    return (
      <div className='anime-list'>
        {
          /* Map the anime list recieved through props and pass the details to the Animecard component*/
          this.props.anime.map((item) => (
            <AnimeCard anime={item} />
          ))
        }
      </div>
    );
  }
}

export default AnimeList;
