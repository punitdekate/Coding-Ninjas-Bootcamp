import "./styles.css";
//create a object to store all the styles.
export default function App() {
  return (
    <div className='App'>
      {/* Refactor the inline style to use the internal style. */}
      <form style={styles.formCss}>
        {/* Refactor the inline style to use the internal style. */}
        <h3 style={styles.formHeading}>Sign Up</h3>
        <input style={styles.padd} placeholder='Username' />
        <input style={styles.padd} placeholder='Email' />
        <input style={styles.padd} placeholder='Password' />
        {/* Refactor the inline style to use the internal style. */}
        <div style={styles.btnDiv}>
          {/* Refactor the inline style to use the internal style. */}
          <button style={styles.cancelBtn}>Cancel</button>
          {/* Refactor the inline style to use the internal style. */}
          <button style={styles.loginBtn}>Login</button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  formCss: {
    width: "60%",
    margin: "50px auto",
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  formHeading: { fontSize: "2rem", letterSpacing: 2 },
  padd: { padding: 10 },
  btnDiv: {
    display: "flex",
    justifyContent: "center",
    gap: 20,
  },
  cancelBtn: {
    outline: "none",
    paddingBlock: 5,
    width: 100,
    backgroundColor: "red",
    color: "white",
    cursor: "pointer",
  },
  loginBtn: {
    outline: "none",
    paddingBlock: 5,
    width: 100,
    backgroundColor: "red",
    color: "white",
    cursor: "pointer",
  },
};
