import styles from "./orderDetails.module.css";
import OrderDetailsItem from "../orderDetailsItem.js/orderDetailsItem";
import orderImage from "../../../assets/tracking.png";
import { useUserContext } from "../../../contexts/userContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function OrderDetails() {
  const { orders, setLoader } = useUserContext();
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null); // Start with null

  useEffect(() => {
    setLoader(true);
    const orderData = orders.find((ele) => ele.id == orderId);
    if (orderData) {
      setLoader(false);
      setOrderDetails(orderData);
    }
  }, [orders, orderId]);

  if (!orderDetails) {
    return <div></div>; // Optionally add a loading state
  }

  return (
    <>
      <div className={styles.orderDetailsTitle}>
        <h2>
          <img src={orderImage} alt='Order' className={styles.orderImage} />
          Order Details
        </h2>
      </div>
      <div className={styles.orderDetails}>
        <div className={styles.orderDetailsContainer}>
          <div className={styles.orderId}>
            <p>
              <b>Order ID : </b>
              {orderDetails.id}
            </p>
          </div>
          <div className={styles.orderDate}>
            <p>
              <b>Order Date : </b>
              {orderDetails.date}
            </p>
          </div>
          <hr />
        </div>
        <div className={styles.items}>
          {orderDetails.order && orderDetails.order.length > 0 ? (
            orderDetails.order.map((ele) => (
              <OrderDetailsItem product={ele} key={ele.id} />
            ))
          ) : (
            <div>No items in this order.</div>
          )}
        </div>
        <div className={styles.total}>Total: {orderDetails.total}</div>
      </div>
    </>
  );
}

export default OrderDetails;
