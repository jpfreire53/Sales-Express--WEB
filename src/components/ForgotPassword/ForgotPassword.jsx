import axios from "axios";
import styles from "./ForgotPassword.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const ForgotPassword = ({open, onClose, newPassword, setOpenModal, setNewPassword,}) => {
  const [userName, setUserName] = useState("");

  const closePopUp = () => {
    setOpenModal(false);
  };

  const handleResetPassword = async () => {
    try {
      
      if (newPassword === "" || userName === "") {
        toast.error("Para alterar a senha, você precisa digitar a nova senha!");
      } else {
        const response = await axios.put(
          `http://localhost:3000/resetpassword/${userName}`, {
             newPassword: newPassword,
          }, {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json"
            }
          }
        );

        if (response.status === 200) {
          toast.success("Senha resetada com sucesso!");
          setOpenModal(false);  
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao resetar senha. Tente novamente mais tarde.");
    }
  };

  return (
    <div onClick={closePopUp} className={styles.overlay}>
      <ToastContainer />
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={styles.modalContainer}
      >
        <div className={styles.allContainer}>
          <div className={styles.content}>
            <input
              type="text"
              className={styles.inputStyles}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Digite seu usuário"
            />
            <input
              type="password"
              className={styles.inputStyles}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Digite a sua nova senha"
            />
            <p className={styles.quest}>Deseja alterar a sua senha atual?</p>
          </div>
          <div className={styles.btnContainer}>
            <button className={styles.btnPrimary} onClick={handleResetPassword}>
              SIM
            </button>
            <button className={styles.btnOutline} onClick={closePopUp}>
              NÃO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
