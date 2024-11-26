import CartItem from "../cartItem/cartItem";
import cartImage from "../../../assets/shopping-cart.png";
import emptyCart from "../../../assets/empty-cart.png";
import styles from "./cart.module.css";
import { useUserContext } from "../../../contexts/userContext";
import { useProductContext } from "../../../contexts/productContext";
import { useNavigate } from "react-router-dom";
function Cart() {
  const { cart, removeCartItem } = useUserContext();
  const { handlePlacedOrder } = useProductContext();
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.cartTitleContainer}>
        <h2 className={styles.title}>
          <img src={cartImage} alt='Cart' className={styles.cartImage} />
          Cart
        </h2>
      </div>
      <div className={styles.cartMainContainer}>
        <div className={styles.cartContainer}>
          {cart.length > 0 ? (
            cart.map((ele) => (
              <CartItem
                cartItem={ele}
                key={ele.id}
                removeCartItem={removeCartItem}
              />
            ))
          ) : (
            <div>
              <img src={emptyCart} alt='Cart' className={styles.emptyCart} />
              <h2>Cart is empty...</h2>
            </div>
          )}
        </div>
        {cart.length > 0 ? (
          <div className={styles.totalContainer}>
            <div>
              <h3>
                {"Total = $" +
                  cart
                    .reduce((acc, curVal) => {
                      return acc + parseFloat(curVal.price * curVal.count);
                    }, 0)
                    .toFixed(2)}
              </h3>
            </div>
            <div>
              <button
                className={styles.placeOrderButton}
                onClick={() => handlePlacedOrder(cart, navigate)}
              >
                Place Order
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Cart;
