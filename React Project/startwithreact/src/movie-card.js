import React from "react";

export default class MovieCard extends React.Component {
  render() {
    const movie = this.props.movie;
    const { title, plot, price, rating, star, fav, isAddedToCart } = movie;

    return (
      <>
        <div className='main'>
          <div className='movie-card'>
            <div className='left'>
              <img
                src='https://thumbs.dreamstime.com/b/iron-man-17900674.jpg'
                alt=''
              ></img>
            </div>
            <div className='right'>
              <div className='title'>{title}</div>
              <div className='plot'>{plot}</div>
              <div className='price'>Price : {price}$</div>
              <div className='footer'>
                <div className='rating'>Rating : {rating}</div>

                <div className='stars'>
                  <img
                    alt=''
                    src='https://cdn-icons-png.flaticon.com/128/1828/1828899.png'
                    onClick={() => this.props.decStar(movie)}
                  ></img>
                  <span>
                    <img
                      alt=''
                      src='https://cdn-icons-png.flaticon.com/128/1828/1828884.png'
                    ></img>
                  </span>

                  <img
                    alt=''
                    src='https://cdn-icons-png.flaticon.com/128/4315/4315609.png'
                    onClick={() => this.props.addStar(movie)}
                  ></img>
                </div>

                <div className='counter'>{star}</div>

                <div className='buttons'>
                  <button
                    className={fav ? "un-favourite-btn" : "favourite-btn"}
                    onClick={() => {
                      this.props.handleFav(movie);
                    }}
                  >
                    {fav ? "un-favourite" : "favourite"}
                  </button>
                  <button
                    className={isAddedToCart ? "remove-cart-btn" : "cart-btn"}
                    onClick={() => this.props.handleCart(movie)}
                  >
                    {isAddedToCart ? "remove" : "Add"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
