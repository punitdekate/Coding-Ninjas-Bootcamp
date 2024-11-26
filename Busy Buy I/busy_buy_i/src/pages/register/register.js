import { Link, useNavigate } from "react-router-dom";
import styles from "./register.module.css";
import { useUserContext } from "../../contexts/userContext";
function Register() {
  const { user, setUser, registerUser, setLoader } = useUserContext();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (user.name && user.email && user.password) {
      setLoader(true);
      registerUser(user, navigate);
    }
  };

  return (
    <form onSubmit={(e) => handleRegister(e)}>
      <div className={styles.loginContainer}>
        <div className={styles.loginTitle}>Register</div>
        <div className={styles.loginEmail}>
          <Label name='Name' />
          <input
            type='text'
            className={styles.loginEmailInput}
            value={user.name}
            onChange={(e) =>
              setUser({
                name: e.target.value,
                email: user.email,
                password: user.password,
              })
            }
            required
          />
        </div>
        <div className={styles.loginEmail}>
          <Label name='Email' />
          <input
            type='email'
            className={styles.loginEmailInput}
            value={user.email}
            onChange={(e) =>
              setUser({
                name: user.name,
                email: e.target.value,
                password: user.password,
              })
            }
            required
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
            required
          />
        </div>
        <div>
          <button className={styles.loginButton} type='submit'>
            Sign Up
          </button>
          <Link to='/login'>
            <button className={styles.loginButton}>Sign In</button>
          </Link>
        </div>
      </div>
    </form>
  );
}

function Label(props) {
  return <label className={styles.loginLabel}>{props.name}</label>;
}

export default Register;
