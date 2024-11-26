import logoImage from "../../assets/shopping.png";
import cartImage from "../../assets/shopping-cart.png";
import profileImage from "../../assets/profile-user.png";
import orderImage from "../../assets/tracking.png";
import styles from "./navbar.module.css";
import { Outlet, Link, useNavigate, NavLink } from "react-router-dom";
import { useUserContext } from "../../contexts/userContext";
import Loader from "../../utility/Loader/loader";
import PopUp from "../../utility/notification/popup";
import { useProductContext } from "../../contexts/productContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Navbar() {
  const { isLoggedIn, loader, user, logout, setLoader } = useUserContext();
  const { searchInput, setSearchInput } = useProductContext();
  const navigate = useNavigate();
  const goToOrders = () => {
    if (isLoggedIn) {
      setLoader(true);
      navigate(`${user.id}/order`);
    } else {
      navigate("/login");
    }
  };

  const goToCart = () => {
    isLoggedIn ? navigate(`${user.id}/cart`) : navigate("/login");
  };

  const handleLogin = () => {
    if (isLoggedIn) {
      logout();
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <nav className={styles.navbarContainer}>
        <div className={styles.logoContainer}>
          <Link to={"/"}>
            <img src={logoImage} alt='Logo' className={styles.logo} />
          </Link>
        </div>
        <div className={styles.searchInputContainer}>
          <input
            className={styles.searchInput}
            placeholder='Search...'
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
          />
        </div>
        <div className={styles.rightContainer}>
          {isLoggedIn ? (
            <div>
              <span className={styles.userName}>Hello {user.name}</span>
            </div>
          ) : null}
          <div className={styles.orderImageContainer}>
            <button onClick={goToOrders} className={styles.decorationButton}>
              <img src={orderImage} alt='Order' className={styles.orderImage} />
            </button>
          </div>
          <div className={styles.cartImageContainer}>
            <button onClick={goToCart} className={styles.decorationButton}>
              <img src={cartImage} alt='Cart' className={styles.cartImage} />
            </button>
          </div>
          <div className={styles.loginContainer}>
            <button className={styles.loginButton} onClick={handleLogin}>
              {isLoggedIn ? "Logout" : "Login"}{" "}
            </button>
          </div>
          {isLoggedIn ? (
            <div className={styles.profileContainer}>
              <NavLink>
                <img src={profileImage} alt='profile' />
              </NavLink>
            </div>
          ) : null}
          {loader && (
            <div className={styles.loaderContainer}>
              <Loader />
            </div>
          )}
        </div>
      </nav>
      <ToastContainer className={styles.toastContainer} />
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </>
  );
}

export default Navbar;
