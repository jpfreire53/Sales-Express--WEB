import styles from "./ProductCreatePage.module.css";
import Navbar from "../../components/Navbar/Navbar";
import logoSave from "../../assets/icons/baseline-save-24px.svg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/Loading/Loading";
import useInserProduct from "../../hooks/useInsertProduct";
import { ShoppingCart } from "lucide-react";

const ProductCreatePage = () => {
  const {
    name,
    setName,
    description,
    setDescription,
    sku,
    setSku,
    loading,
    handleInsertProduct
  } = useInserProduct();

  return (
    <div className={styles.container}>
      {loading && <Loading />}
      <ToastContainer />
      <Navbar />
      <div className={styles.infoRectangle}>
        <h1 className={styles.titleAdd}>
          <ShoppingCart className={styles.logoAdd} />
          CADASTRAR UM NOVO PRODUTO
        </h1>
        <div className={styles.containerInput}>
          <div>
            <label>NOME</label>
            <input
              type="text"
              className={styles.inputStyles}
              value={name}
              onChange={((e) => setName(e.target.value))}
              maxLength={30}
            />
          </div>
          <div>
            <label>DESCRIÇÃO</label>
            <input
              type="text"
              className={styles.inputStyles}
              value={description}
              onChange={((e) => setDescription(e.target.value))}
              maxLength={35}
            />
          </div>
          <div>
            <label>SKU</label>
            <input
              type="text"
              className={styles.inputStyles}
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              maxLength={35}
            />
          </div>
        </div>
        <div className={styles.containerBtn}>
          <div className={styles.containerAdd}>
            <div className={styles.quadradoAzul}>
              <img
                className={styles.logoCad}
                src={logoSave}
                alt="ImagLogoAddem"
              />
            </div>
            <button className={styles.linkRetangular} onClick={handleInsertProduct}>
              SALVAR PRODUTO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCreatePage;
