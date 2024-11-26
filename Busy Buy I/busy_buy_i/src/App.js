import { UserContextProvider } from "./contexts/userContext";
import ProductContextProvider from "./contexts/productContext";
import Navbar from "./pages/navbar/navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Cart from "./pages/cart/cart/cart";
import Error from "./utility/error/error";
import OrderList from "./pages/order/orderList/orderList";
import OrderDetails from "./pages/order/orderDetails/orderDetails";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: ":userId/cart",
          element: <Cart />,
        },
        {
          path: ":userId/order",
          element: <OrderList />,
        },
        {
          path: ":userId/order/:orderId",
          element: <OrderDetails />,
        },
      ],
    },
  ]);
  return (
    <>
      <UserContextProvider>
        <ProductContextProvider>
          <RouterProvider router={router} />
        </ProductContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
