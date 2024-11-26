import styles from "./cartItem.module.css";
import plusImage from "../../../assets/plus.png";
import minusImage from "../../../assets/minus-button.png";
import { useUserContext } from "../../../contexts/userContext";
function CartItem({ cartItem, removeCartItem }) {
  const { opCartItem } = useUserContext();

  return (
    <>
      <div className={styles.cartItemContainer}>
        <div className={styles.cartItemImageContainer}>
          <img
            src={cartItem.image}
            alt='product image'
            className={styles.itemImage}
          />
        </div>
        <div className={styles.detailsContainer}>
          <div className={styles.itemDetailContainer}>
            <p>{cartItem.title}</p>
            <p>${cartItem.price}</p>
          </div>
          <div className={styles.buttonContainer}>
            <div className={styles.cardButtonContainer}>
              <div className={styles.cardMinusContainer}>
                <button
                  className={styles.removeButton}
                  onClick={() => opCartItem(cartItem.id, "sub")}
                >
                  <img
                    src={minusImage}
                    alt='-'
                    className={styles.removeImage}
                  />
                </button>
              </div>

              <div className={styles.cardCountContainer}>
                <p className={styles.count}>
                  <b>{cartItem.count}</b>
                </p>
              </div>

              <div className={styles.cardAddContainer}>
                <button
                  className={styles.addButton}
                  onClick={() => opCartItem(cartItem.id, "add")}
                >
                  <img src={plusImage} alt='+' className={styles.addImage} />
                </button>
              </div>
              <div className={styles.addToCartContainer}>
                <button
                  className={styles.removeFromCartButton}
                  onClick={() => removeCartItem(cartItem.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartItem;
