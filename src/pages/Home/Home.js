import logoRemove from "../../assets/icons/delete_black_24dp.svg";
import Logoadd from "../../assets/icons/person_add_black_24dp.svg";
import ListUser from "../../components/ListUser/ListUser";
import Navbar from "../../components/Navbar/Navbar";
import DeletePopUp from "../../components/DeletePopUp/DeletePopUp";
import styles from "./Home.module.css";
import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useListUser from "../../hooks/useListUser";

const Home = () => {
  const {
    selectUser,
    setSelectUser,
    openModal,
    setOpenModal,
    users,
    windowWidth,
    loading,
  } = useListUser();

  if (loading) {
    return <div>Loading....</div>;
  }

  return (
    <div className={styles.container}>
      {windowWidth <= 480 ? (
        <DeletePopUp
          open={openModal}
          onClose={() => {
            setOpenModal(true);
          }}
          selectUser={selectUser}
          setOpenModal={setOpenModal}
        />
      ) : (
        ""
      )}
      <ToastContainer />
      <Navbar />
      <div className={styles.infoRectangle}>
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
          <tbody className={styles.containerList}>
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
      <div className={styles.containerBtn}>
        <div className={styles.containerRemove}>
          <div
            className={
              selectUser == 0 ? styles.quadradoCinza : styles.quadradoAzul
            }
          >
            <img
              className={styles.logoRemove}
              src={logoRemove}
              alt="ImagLogoRemove"
            />
          </div>
          <button
            onClick={() => {
              if (selectUser !== 0) {
                setOpenModal(true);
              } else {
                setOpenModal(false);
              }
            }}
            className={
              selectUser == 0
                ? styles.linkRetangularCinza
                : styles.linkRetangular
            }
            disabled={selectUser == 0}
          >
            EXCLUIR USUÁRIO
          </button>
        </div>
        <div className={styles.containerAdd}>
          <div className={styles.quadradoAzul}>
            <img className={styles.logoCad} src={Logoadd} alt="ImagLogoAddem" />
          </div>
          <Link className={styles.linkRetangular} to="/register">
            CADASTRAR NOVO USUÁRIO
          </Link>
        </div>
      </div>
      {windowWidth > 480 ? (
        <DeletePopUp
          open={openModal}
          onClose={() => {
            setOpenModal(true);
          }}
          selectUser={selectUser}
          setOpenModal={setOpenModal}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;
