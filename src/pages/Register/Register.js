import styles from "./Register.module.css";
import Navbar from "../../components/Navbar/Navbar";
import logoAdd from "../../assets/icons/person_add_black_24dp (1).svg";
import logoReset from "../../assets/icons/baseline-refresh-24px.svg";
import logoSave from "../../assets/icons/baseline-save-24px.svg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputMask from "react-input-mask";
import useInsertUser from "../../hooks/useInsertUser";

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
    loading,
    handleUserChange,
    handleNameChange,
    handleRegister,
  } = useInsertUser();

  if (loading) {
    return <div>Loading....</div>;
  }

  return (
    <div className={styles.container}>
      <ToastContainer />
      <Navbar />
      <div className={styles.infoRectangle}>
        <h1 className={styles.titleAdd}>
          <img src={logoAdd} alt="logoAdd" className={styles.logoAdd} />
          CADASTRAR UM NOVO USUÁRIO
        </h1>
        <div className={styles.containerInput}>
          <div>
            <label>USUÁRIO</label>
            <input
              type="text"
              className={styles.inputStyles}
              value={user}
              onChange={((e) => setUser(e.target.value), handleUserChange)}
              maxLength={30}
            />
          </div>
          <div>
            <label>NOME</label>
            <input
              type="text"
              className={styles.inputStyles}
              value={name}
              onChange={((e) => setName(e.target.value), handleNameChange)}
              maxLength={35}
            />
          </div>
          <div>
            <label>EMPRESA</label>
            <input
              type="text"
              className={styles.inputStyles}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              maxLength={35}
            />
          </div>
          <div>
            <label>CNPJ</label>
            <InputMask
              mask="99.999.999/9999-99"
              type="text"
              className={styles.inputStyles}
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className={styles.containerBtn}>
        <div className={styles.containerRemove}>
          <div className={styles.quadradoCinza}>
            <img
              className={styles.logoRemove}
              src={logoReset}
              alt="ImagLogoRemove"
            />
          </div>
          <button className={styles.linkRetangularCinza}>RESETAR SENHA</button>
        </div>
        <div className={styles.containerAdd}>
          <div className={styles.quadradoAzul}>
            <img
              className={styles.logoCad}
              src={logoSave}
              alt="ImagLogoAddem"
            />
          </div>
          <button className={styles.linkRetangular} onClick={handleRegister}>
            SALVAR ALTERAÇÕES
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
