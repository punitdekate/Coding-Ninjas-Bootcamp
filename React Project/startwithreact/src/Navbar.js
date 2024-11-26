import React from "react";
import Styled from "styled-components";

const Nav = Styled.div`
    height : 7vh;
    display : flex;
    justify-content : space-between;
    padding : 3px;
    align-items : center;
    background-color : blue;
`;
const Title = Styled.div`
    font-size : 2rem;
`;

const Cart = Styled.div`
    margin-right : 2rem
`;
const CartImage = Styled.img`
    width : 30px;
`;

const CartCount = Styled.span`
    position : absolute;
    background-color : yellow;
    border-radius : 50%;
    padding :3px;
    top : -4px
`;
export default class Navbar extends React.Component {
  render() {
    const { cartCount } = this.props;
    return (
      <>
        <Nav>
          <Title>Movie-App</Title>
          <Cart>
            <CartImage
              alt='cart'
              src='https://cdn-icons-png.flaticon.com/128/2838/2838895.png'
            />
            <CartCount>{cartCount}</CartCount>
          </Cart>
        </Nav>
      </>
    );
  }
}
