import { useState } from "react";
import { useNavigate } from "react-router";

import styles from "./Auth.module.scss";

const Auth = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  //   useEffect(() => {
  //     if (localStorage.getItem("isLogged") === "true") {
  //       navigate("/welcome");
  //     }
  //   }, []);
  return (
    <div className={styles.auth}>
      <div className={styles.auth_title}>Enter a password</div>
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className={styles.auth_input}
        type="text"
        placeholder="Password"
      />
      <button
        className={styles.auth_button}
        onClick={() => {
          if (password === "lemonbold") {
            localStorage.setItem("isLogged", "true");
            navigate("/loader");
          } else {
            setPassword("");
          }
        }}
      >
        Enter
      </button>
    </div>
  );
};
export default Auth;
