import styles from "./Login.module.css";
import logo from "../../assets/icons/sales_express.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthentication from "../../hooks/useAuthentication";
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useState } from "react";
import Loading from "../../components/Loading/Loading";
import ForgotPassword from "../../components/ForgotPassword/ForgotPassword";

const Login = () => {
  const { user, password, setUser, setPassword, handleSubmit, loading } = useAuthentication();
  const [showPassword, setShowPassword] = useState(false)
  const [newPassword, setNewPassword] = useState("");
  const [openModal, setOpenModal] = useState(false);
  
  if (openModal) {
    return <ForgotPassword
        open={openModal}
        onClose={() => {
          setOpenModal(true);
        }}
        setOpenModal={setOpenModal}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        userId={1}
      /> 
  }

  return (
    <div>
      {loading && <Loading />}
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
          <button className={styles.forget} onClick={() => setOpenModal(true)}>Esqueci a senha</button>
        </h3>
      </div>
    </div>
  );
};

export default Login;
