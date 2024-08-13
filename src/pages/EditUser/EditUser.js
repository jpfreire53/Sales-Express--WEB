import styles from "./EditUser.module.css";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import logoAdd from "../../assets/icons/edit_black_24dp.svg";
import logoReset from "../../assets/icons/baseline-refresh-24px.svg";
import logoSave from "../../assets/icons/baseline-save-24px.svg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetPopUp from "../../components/ResetPopUp/ResetPopUp";
import InputMask from "react-input-mask";
import useEditUser from "../../hooks/useEditUser";

const EditUser = () => {
  const { id } = useParams();
  const {
    openModal,
    setOpenModal,
    newPassword,
    setNewPassword,
    windowWidth,
    userData,
    setUserData,
    loading,
    handleSaveChanges,
  } = useEditUser(id);

  if (loading) {
    return <div>Loading....</div>;
  }

  return (
    <div className={styles.container}>
      {windowWidth <= 480 ? (
        <ResetPopUp
          open={openModal}
          onClose={() => {
            setOpenModal(true);
          }}
          setOpenModal={setOpenModal}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          userId={id}
        />
      ) : (
        ""
      )}
      <ToastContainer />
      <Navbar />
      <div className={styles.infoRectangle}>
        <h1 className={styles.titleAdd}>
          <img src={logoAdd} alt="logoAdd" className={styles.logoAdd} />
          EDITAR USUÁRIO
        </h1>
        <form className={styles.containerInput}>
          <div>
            <label>USUÁRIO</label>
            <input
              type="text"
              className={styles.inputStyles}
              onChange={(e) => {
                const filteredValue = e.target.value.replace(
                  /[^a-zA-Z.\s]/g,
                  ""
                );

                setUserData({
                  ...userData,
                  user: filteredValue,
                });
              }}
              value={userData.user}
              name="user"
            />
          </div>
          <div>
            <label>NOME</label>
            <input
              type="text"
              className={styles.inputStyles}
              onChange={(e) => {
                const filteredValue = e.target.value.replace(
                  /[^a-zA-Z.\s]/g,
                  ""
                );

                setUserData({
                  ...userData,
                  name: filteredValue,
                });
              }}
              value={userData.name}
              name="name"
            />
          </div>
          <div>
            <label>EMPRESA</label>
            <input
              type="text"
              className={styles.inputStyles}
              onChange={(e) => {
                setUserData({
                  ...userData,
                  company: e.target.value,
                });
              }}
              value={userData.company}
              name="company"
            />
          </div>
          <div>
            <label>CNPJ</label>
            <InputMask
              mask="99.999.999/9999-99"
              type="text"
              className={styles.inputStyles}
              onChange={(e) => {
                setUserData({
                  ...userData,
                  cnpj: e.target.value,
                });
              }}
              value={userData.cnpj}
              name="cnpj"
            />
          </div>
        </form>
      </div>
      <div className={styles.containerBtn}>
        <div className={styles.containerRemove}>
          <div className={styles.quadradoAzul}>
            <img
              className={styles.logoRemove}
              src={logoReset}
              alt="ImagLogoRemove"
            />
          </div>
          <button
            className={styles.linkRetangular}
            onClick={() => setOpenModal(true)}
          >
            RESETAR SENHA
          </button>
        </div>
        <div className={styles.containerAdd}>
          <div className={styles.quadradoAzul}>
            <img
              className={styles.logoCad}
              src={logoSave}
              alt="ImagLogoAddem"
            />
          </div>
          <button className={styles.linkRetangular} onClick={handleSaveChanges}>
            SALVAR ALTERAÇÕES
          </button>
        </div>
      </div>
      {windowWidth > 480 ? (
        <ResetPopUp
          open={openModal}
          onClose={() => {
            setOpenModal(true);
          }}
          setOpenModal={setOpenModal}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          userId={id}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default EditUser;
