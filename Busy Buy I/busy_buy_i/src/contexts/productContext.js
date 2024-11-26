import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../init";
import {
  getDocs,
  collection,
  addDoc,
  onSnapshot,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useUserContext } from "./userContext";
const productContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const { user, isLoggedIn, setLoader, showPopup, setOrders } =
    useUserContext();
  const [searchInput, setSearchInput] = useState("");
  const [categories, setCategories] = useState([
    "Electronics",
    "Clothing",
    "Computers",
    "Smartphones",
    "Footwear",
  ]);
  const [price, setPrice] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState([]);

  useEffect(() => {
    console.log(price, selectedCategory);
    async function filter() {
      try {
        // Fetch all products
        const filter = {};
        if (price) {
          filter.price = price;
        }
        const snapshot = await getDocs(collection(db, "Products"));

        // Filter products based on the search input
        const productList = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((item) => (price ? Number(item.price) <= price : true))
          .filter((item) =>
            selectedCategory.length > 0
              ? selectedCategory.includes(item.category.toLowerCase())
              : true
          );
        setProducts([...productList]);

        setLoader(false);
      } catch (error) {
        throw error;
      }
    }
    filter();
  }, [price, selectedCategory]);

  useEffect(() => {
    async function search() {
      try {
        if (searchInput) {
          // Fetch all products
          const snapshot = await getDocs(collection(db, "Products"));

          // Filter products based on the search input
          const productList = snapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .filter((item) =>
              item.title.toLowerCase().includes(searchInput.toLowerCase())
            );
          setProducts([...productList]);

          setLoader(false);
        }
      } catch (error) {
        throw error;
      }
    }
    search();
  }, [searchInput]);

  const handlePlacedOrder = async (cartData, navigate) => {
    try {
      setLoader(true);
      const order = {
        id: Date.now(),
        order: [...cartData],
        total: cartData
          .reduce((acc, curVal) => {
            return acc + parseFloat(curVal.price * curVal.count);
          }, 0)
          .toFixed(2),
        date: new Date().toString(),
      };
      const snapshot = await getDocs(collection(db, "Users"));
      const userExistsRef = snapshot.docs.find((doc) => doc.id === user.id);
      if (userExistsRef) {
        const userDocRef = doc(db, "Users", userExistsRef.id);
        setOrders([order, ...userExistsRef.data().order]);
        await updateDoc(userDocRef, {
          order: user.order ? [order, ...userExistsRef.data().order] : [order],
          cart: [],
        });
        setLoader(false);
        showPopup("green", "Order has been successfully placed");
        navigate(`/${user.id}/order/${order.id}`);
      }
    } catch (error) {
      throw error;
    }
  };
  //Get All products list to display to the home page.
  const fetchProducts = async () => {
    try {
      const snapshot = await getDocs(collection(db, "Products"));
      const productList = snapshot.docs.map((item) => item.data());
      setProducts([...productList]);
      setLoader(false);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    setLoader(true);
    fetchProducts();
  }, []);

  return (
    <productContext.Provider
      value={{
        products,
        handlePlacedOrder,
        setSearchInput,
        searchInput,
        categories,
        price,
        setPrice,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </productContext.Provider>
  );
};

const useProductContext = () => useContext(productContext);
export { useProductContext };
export default ProductContextProvider;
