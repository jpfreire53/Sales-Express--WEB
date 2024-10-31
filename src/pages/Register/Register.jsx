import React from 'react';
import styles from "./Register.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { UserPlus, RefreshCw, Save } from 'lucide-react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputMask from "react-input-mask";
import useInsertUser from "../../hooks/useInsertUser";
import Loading from "../../components/Loading/Loading";

const Register = () => {
  const {
    user,
    setUser,
    name,
    setName,
    company,
    setCompany,
    cnpj,
    setCnpj,
    userType,
    setUserType,
    role,
    setRole,
    loading,
    handleUserChange,
    handleNameChange,
    handleRegister,
  } = useInsertUser();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <ToastContainer />
      <Navbar />
      <div className={styles.infoRectangle}>
        <h1 className={styles.titleAdd}>
          <UserPlus className={styles.logoAdd} />
          CADASTRAR UM NOVO USUÁRIO
        </h1>
        <div className={styles.containerInput}>
          <div className={styles.inputGroup}>
            <label htmlFor="user">USUÁRIO</label>
            <input
              id="user"
              type="text"
              className={styles.inputStyles}
              value={user}
              onChange={(e) => {
                setUser(e.target.value);
                handleUserChange(e);
              }}
              maxLength={30}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="name">NOME</label>
            <input
              id="name"
              type="text"
              className={styles.inputStyles}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                handleNameChange(e);
              }}
              maxLength={35}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="company">EMPRESA</label>
            <input
              id="company"
              type="text"
              className={styles.inputStyles}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              maxLength={35}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="cnpj">CNPJ</label>
            <InputMask
              id="cnpj"
              mask="99.999.999/9999-99"
              maskChar=""
              type="text"
              className={styles.inputStyles}
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="userType">NÍVEL DE ACESSO</label>
            <input
              id="userType"
              type="text"
              className={styles.inputStyles}
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="role">CARGO</label>
            <input
              id="role"
              type="text"
              className={styles.inputStyles}
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.containerBtn}>
          <button className={styles.linkRetangularCinza}>
            <RefreshCw className={styles.buttonIcon} />
            RESETAR SENHA
          </button>
          <button className={styles.linkRetangular} onClick={handleRegister}>
            <Save className={styles.buttonIcon} />
            SALVAR ALTERAÇÕES
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;