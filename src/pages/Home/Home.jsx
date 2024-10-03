import React from "react";
import logoRemove from "../../assets/icons/delete_black_24dp.svg";
import Logoadd from "../../assets/icons/person_add_black_24dp.svg";
import Navbar from "../../components/Navbar/Navbar";
import ListUser from "../../components/ListUser/ListUser";
import DeletePopUp from "../../components/DeletePopUp/DeletePopUp";
import Loading from "../../components/Loading/Loading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useListUser from "../../hooks/useListUser";
import Cookies from "js-cookie";
import styles from "./Home.module.css";

export default function Home() {
  const {
    selectUser,
    setSelectUser,
    openModal,
    setOpenModal,
    users,
    loading,
  } = useListUser();

  const userType = Cookies.get("userType");

  return (
    <div className={styles.container}>
      {loading && <Loading />}
      <ToastContainer />
      <Navbar />
      <div className={styles.content}>
        <div className={styles.tableWrapper}>
          <table className={styles.userInfo}>
            <thead>
              <tr>
                <th></th>
                <th>USUÁRIO</th>
                <th>NOME</th>
                <th>EMPRESA</th>
                <th>CNPJ</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <ListUser
                  key={index}
                  user={user}
                  selectUser={selectUser}
                  setSelectUser={setSelectUser}
                />
              ))}
            </tbody>
          </table>
        </div>
        {userType === "Admin" && (
          <div className={styles.actionButtons}>
            <button
              onClick={() => {
                if (selectUser.length > 0) {
                  setOpenModal(true);
                }
              }}
              className={`${styles.button} ${styles.deleteButton} ${
                selectUser.length === 0 ? styles.disabled : ""
              }`}
              disabled={selectUser.length === 0}
            >
              <span className={styles.iconWrapper}>
                <img
                  src={logoRemove}
                  alt="Delete"
                  className={styles.buttonIcon}
                />
              </span>
              EXCLUIR USUÁRIO
            </button>
            <button
              className={`${styles.button} ${styles.addButton}`}
              onClick={() => (window.location.href = "/register")}
            >
              <span className={styles.iconWrapper}>
                <img
                  src={Logoadd}
                  alt="Add"
                  className={styles.buttonIcon}
                />
              </span>
              CADASTRAR NOVO USUÁRIO
            </button>
          </div>
        )}
      </div>
      <DeletePopUp
        open={openModal}
        onClose={() => setOpenModal(false)}
        selectUser={selectUser}
        setOpenModal={setOpenModal}
      />
    </div>
  );
}