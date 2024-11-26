import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { db } from "../init";
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
const userContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    cart: [],
    order: [],
  });
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const [popup, setPopup] = useState(false);
  const [color, setColor] = useState(null);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  // const timer = () => {
  //   const ele = setTimeout(() => {
  //     setPopup(false);
  //     setError(null);
  //     setColor(null);
  //   }, 3000);
  //   return () => clearTimeout(ele);
  // };
  const showPopup = (colorInput, msg = null) => {
    if (colorInput === "red") {
      toast.error(msg);
    } else if (colorInput === "green") {
      toast.success(msg);
    } else {
      toast.success(msg);
    }
    setLoader(false);
  };
  const loginUser = async (user, navigate) => {
    try {
      const snapshot = await getDocs(collection(db, "Users"));
      const userExists = snapshot.docs.find((doc) => {
        if (
          doc.data().email === user.email &&
          doc.data().password === user.password
        ) {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }
        return null;
      });
      if (userExists) {
        setUser({
          id: userExists.id,
          ...userExists.data(),
        });
        setIsLoggedIn(true);
        showPopup("green", "User logged in succesfully.");
        setLoader(false);
        navigate("/");
      } else {
        showPopup("red", "Invalid Credentials");
        setLoader(false);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const registerUser = async (user, navigate) => {
    try {
      const snapshot = await getDocs(collection(db, "Users"));
      const userExists = snapshot.docs.find(
        (doc) => doc.data().email === user.email
      );

      if (!userExists) {
        await addDoc(collection(db, "Users"), {
          name: user.name,
          email: user.email,
          password: user.password,
          cart: [],
          order: [],
        });
        setIsLoggedIn(true);
        setUser({
          name: user.name,
          email: user.email,
          password: user.password,
          cart: [],
          order: [],
        });
        setLoader(false);
        navigate("/login");
      } else {
        showPopup("red", "User already exists");
        setLoader(false);
      }
    } catch (error) {
      showPopup("red", "Error in registering user please try after some time.");
    }
  };
  const logout = () => {
    setIsLoggedIn(false);
    setUser({
      id: "",
      name: "",
      email: "",
      password: "",
      cart: [],
      order: [],
    });
    showPopup("red", "User logged out succesfully.");
  };

  const opCartItem = async (productId, op) => {
    try {
      setLoader(true);
      const snapshot = await getDocs(collection(db, "Users"));
      const userExistsRef = snapshot.docs.find((doc) => doc.id === user.id);
      if (userExistsRef) {
        const updatedCart = userExistsRef.data().cart.map((ele) => {
          if (ele.id === productId) {
            if (op === "add") {
              ele.count += 1;
            } else if (op === "sub" && ele.count > 1) {
              ele.count -= 1;
            }
          }
          return ele;
        });
        const userDocRef = doc(db, "Users", userExistsRef.id);
        await updateDoc(userDocRef, { cart: [...updatedCart] });
        setLoader(false);
      }
    } catch (error) {
      throw error;
    }
  };

  const addProductToCart = async (productData, navigate) => {
    try {
      if (!isLoggedIn) {
        navigate("/login");
        return;
      }

      setLoader(true);

      // Check if the product is already in the cart using local state
      const productIsPresentInCart = cart.find(
        (item) => item.id === productData.id
      );

      if (productIsPresentInCart) {
        showPopup("red", "Product is already in the cart");
        setLoader(false);
        return;
      }

      // Add product to Firestore cart
      const userDocRef = doc(db, "Users", user.id);
      const cartItem = { ...productData, count: 1 };
      setCart((prevCart) => [...prevCart, cartItem]);
      await updateDoc(userDocRef, {
        cart: arrayUnion(cartItem),
      });
      console.log(cart);
      // Update local state

      showPopup("green", "Product added to the cart");
      setLoader(false);
    } catch (error) {
      showPopup("red", "Something went wrong while adding the product");
      setLoader(false);
    }
  };

  const removeCartItem = async (productId) => {
    try {
      setLoader(true);

      // Check if the product is in the cart using local state
      const productIsPresentInCart = cart.find((item) => item.id === productId);

      if (!productIsPresentInCart) {
        showPopup("red", "Product not found in the cart.");
        setLoader(false);
        return;
      }

      const userDocRef = doc(db, "Users", user.id);

      // Update local state
      setCart((prevCart) => prevCart.filter((item) => item.id !== productId));

      showPopup("red", "Product removed from the cart");
      // Update Firestore to remove the item
      await updateDoc(userDocRef, {
        cart: arrayRemove(productIsPresentInCart),
      });

      setLoader(false);
    } catch (error) {
      console.error("Error removing product from cart:", error);
      showPopup("red", "Something went wrong while removing the product");
      setLoader(false);
    }
  };

  // Fetch user cart and orders using onSnapshot (real-time updates)
  const fetchUserData = () => {
    if (user.id) {
      const userDocRef = doc(db, "Users", user.id);

      // Real-time updates for orders
      const unsubscribeOrders = onSnapshot(userDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const isUser = docSnapshot.data();
          const orderData = Array.isArray(isUser.order) ? isUser.order : [];
          setOrders([...orderData]);
        } else {
          console.log("No orders found.");
        }
      });

      // Real-time updates for cart
      const unsubscribeCart = onSnapshot(userDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const isUser = docSnapshot.data();
          const cartData = Array.isArray(isUser.cart) ? isUser.cart : [];
          setCart([...cartData]);
        } else {
          console.log("No cart found.");
        }
      });

      // Clean up the listener when the component is unmounted
      return () => {
        unsubscribeOrders();
        unsubscribeCart();
      };
    }
  };
  useEffect(() => {
    if (isLoggedIn) {
      const unsubscribe = fetchUserData();
      return () => {
        if (unsubscribe) unsubscribe(); // Clean up listeners
      };
    }
  }, [isLoggedIn, user.id]);

  return (
    <userContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        popup,
        setPopup,
        loader,
        setLoader,
        registerUser,
        loginUser,
        error,
        setError,
        color,
        logout,
        showPopup,
        opCartItem,
        addProductToCart,
        cart,
        orders,
        setOrders,
        removeCartItem,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useUserContext = () => useContext(userContext);
