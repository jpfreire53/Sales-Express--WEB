import styles from "./DeletePopUp.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeletePopUp = ({ open, onClose, selectUser, setOpenModal }) => {
  if (!open) return null;

  const closePopUp = () => {
    setOpenModal(false);
  };

  const handleDelete = async () => {
    try {
      const userIds = selectUser.map((user) => user.id);

      const response = await fetch(
        "http://localhost:3000/deleteuser",

        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userIds: userIds,
          }),
        }
      );

      if (!response.ok) {
        toast.error("Não foi possível deletar o(s) usuário(s)");
      } else {
        closePopUp();
        window.location.reload();
        toast.success("Usuario Deletado com successo!");
      }
    } catch (error) {
      console.error("Erro ao deletar: " + error);
    } finally {
      closePopUp();
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
            <p className={styles.delete}>
              Você está prestes a excluir os seguintes usuários:
            </p>
            {selectUser &&
              selectUser.map((user) => (
                <p className={styles.bold}>{user.user}</p>
              ))}
            <p className={styles.quest}>Deseja prosseguir?</p>
          </div>
          <div className={styles.btnContainer}>
            <button className={styles.btnPrimary} onClick={handleDelete}>
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

export default DeletePopUp;
