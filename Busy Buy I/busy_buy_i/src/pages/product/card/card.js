import styles from "./card.module.css";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../contexts/userContext";
function Card({ product }) {
  const { addProductToCart } = useUserContext();
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.cardContainer}>
        <div className={styles.cardImageContainer}>
          <img
            src={product.image}
            alt='product image'
            className={styles.cardImage}
          />
        </div>
        <div className={styles.cardTitle}>{product.title}</div>
        <div className={styles.cardPrice}>$ {product.price}</div>
        <div className={styles.cardButtonContainer}>
          <div className={styles.addToCartContainer}>
            <button
              className={styles.addToCartButton}
              onClick={() => addProductToCart(product, navigate)}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
