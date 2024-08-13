import styles from "./ResetPopUp.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPopUp = ({
  open,
  onClose,
  newPassword,
  setOpenModal,
  setNewPassword,
  userId,
}) => {
  if (!open) return null;

  const closePopUp = () => {
    setOpenModal(false);
  };

  const handleResetPassword = async () => {
    try {
      const encodedPassword = btoa(newPassword);

      const response = await fetch(
        `http://localhost:3000/resetpassword/${userId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword: encodedPassword }),
        }
      );
      if (newPassword == "" || newPassword == null) {
        toast.error("Para alterar a senha, você precisa digitar a nova senha!");
      } else if (response.ok) {
        toast.success("Senha resetada com sucesso!");
        setOpenModal(false);
      } else {
        toast.error("Erro ao resetar senha. Tente novamente mais tarde.");
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
            <p className={styles.delete}>Digite a sua nova senha: </p>
            <input
              type="password"
              className={styles.inputStyles}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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

export default ResetPopUp;
