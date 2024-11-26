import Card from "../product/card/card";
import styles from "./home.module.css";
import Filter from "../filter/filter";
import { useProductContext } from "../../contexts/productContext";

function Home() {
  const { products } = useProductContext();
  return (
    <>
      <div className={styles.homeContainer}>
        <div className={styles.leftSection}>
          <Filter />
        </div>
        <div className={styles.rightSection}>
          {products.map((product, index) => (
            <Card product={product} key={index} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
