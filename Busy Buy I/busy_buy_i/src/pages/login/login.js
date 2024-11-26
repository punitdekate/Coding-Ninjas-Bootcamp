import { Link } from "react-router-dom";
import styles from "./login.module.css";
import { useUserContext } from "../../contexts/userContext";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const { user, setUser, loginUser, setLoader } = useUserContext();
  const emailRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (user.email && user.password) {
      setLoader(true);
      loginUser(user, navigate);
    }
  };

  return (
    <form onSubmit={(e) => handleLogin(e)}>
      <div className={styles.loginContainer}>
        <div className={styles.loginTitle}>Login</div>
        <div className={styles.loginEmail}>
          <Label name='Email' />
          <input
            type='email'
            className={styles.loginEmailInput}
            placeholder='abc@example.com'
            value={user.email}
            onChange={(e) =>
              setUser({
                name: user.name,
                email: e.target.value,
                password: user.password,
              })
            }
            ref={emailRef}
          />
        </div>
        <div className={styles.loginPassword}>
          <Label name='Password' />
          <input
            type='password'
            className={styles.loginPasswordInput}
            value={user.password}
            onChange={(e) =>
              setUser({
                name: user.name,
                email: user.email,
                password: e.target.value,
              })
            }
          />
        </div>
        <div>
          <button type='submit' className={styles.loginButton}>
            Sign In
          </button>
          <Link to='/register'>
            <button className={styles.loginButton}>Sign Up</button>
          </Link>
        </div>
      </div>
    </form>
  );
}

function Label(props) {
  return <label className={styles.loginLabel}>{props.name}</label>;
}

export default Login;
