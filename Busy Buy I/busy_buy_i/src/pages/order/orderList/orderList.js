import styles from "./orderList.module.css";
import OrderItem from "../orderItem/orderItem";
import emptyOrder from "../../../assets/empty-box.png";
import { useUserContext } from "../../../contexts/userContext";
import { Link } from "react-router-dom";
import { useEffect } from "react";
function OrderList() {
  const { orders, setLoader } = useUserContext();
  useEffect(() => {
    setLoader(false);
  }, [orders]);
  return (
    <>
      <div className={styles.orderTitleContainer}>
        <h2 className={styles.orderTitle}>Orders</h2>
      </div>

      <div className={styles.orderListContainer}>
        {orders.length > 0 ? (
          orders.map((order) => <OrderItem order={order} key={order.id} />)
        ) : (
          <div>
            <img src={emptyOrder} alt='Cart' className={styles.emptyOrder} />
            <h2>Order is empty...</h2>
          </div>
        )}
      </div>
    </>
  );
}
export default OrderList;
