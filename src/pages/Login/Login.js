import styles from "./Login.module.css";
import logo from "../../assets/icons/sales_express.png";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthentication from "../../hooks/useAuthentication";

const Login = () => {
  const { user, password, setUser, setPassword, handleSubmit, loading } = useAuthentication();

  if (loading) {
    return <div>Loading....</div>;
  }

  return (
    <div>
      <ToastContainer />
      <div className={styles.containerData}>
        <img className={styles.imgLogo} src={logo} alt="Group 24" />
        <input
          className={styles.inputStyle}
          type="text"
          placeholder="Usuário"
          value={user}
          maxLength={30}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          className={styles.inputStyle}
          type="password"
          placeholder="Senha"
          value={password}
          maxLength={20}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.btnLogin} onClick={handleSubmit}>
          LOGIN
        </button>
        <h3>
          <Link className={styles.forget}>Esqueci a senha</Link>
        </h3>
      </div>
    </div>
  );
};

export default Login;
