import { Component } from "react";

// Complete the AnimeCard Component
class AnimeCard extends Component {
  render() {
    return (
      <div className='anime-card'>
        <img src={this.props.anime.image} alt={this.props.anime.image} />
        <p>{this.props.anime.name}</p>
      </div>
    );
  }
}

export default AnimeCard;
