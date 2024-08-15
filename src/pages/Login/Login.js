import styles from "./Login.module.css";
import logo from "../../assets/icons/sales_express.png";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthentication from "../../hooks/useAuthentication";
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useState } from "react";
import Loading from "../../components/Loading/Loading";

const Login = () => {
  const { user, password, setUser, setPassword, handleSubmit, loading } = useAuthentication();
  const [showPassword, setShowPassword] = useState(false)
 
  if (loading) {
    return <Loading />;
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
          required
          maxLength={30}
          onChange={(e) => setUser(e.target.value)}
        />
        <div className={styles.inputContainer}>
          <input
            className={styles.inputPassword}
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            value={password}
            required
            maxLength={20}
            onChange={(e) => setPassword(e.target.value)}
          />
          {showPassword ?              
            <EyeIcon onClick={() => setShowPassword(!showPassword)} style={{ cursor: "pointer" }} /> 
                : 
            <EyeOffIcon onClick={() => setShowPassword(!showPassword)} style={{ cursor: "pointer" }} />
          }
        </div>
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
