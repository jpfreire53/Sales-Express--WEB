import React from "react";
import { ShoppingCart } from "lucide-react";
import ListProduct from "../../components/ListProduct/ListProduct";
import Loading from "../../components/Loading/Loading";
import Navbar from "../../components/Navbar/Navbar";
import useListProduct from "../../hooks/useListProduct";
import styles from "./ProductPage.module.css";

export default function ProductPage() {
  const { listProducts, loading } = useListProduct();

  return (
    <div className={styles.container}>
      {loading && <Loading />}
      <Navbar />
      <div className={styles.content}>
        <div className={styles.tableWrapper}>
          <table className={styles.productInfo}>
            <thead>
              <tr>
                <th>ID</th>
                <th>NOME</th>
                <th>DESCRIÇÃO</th>
                <th>SKU</th>
              </tr>
            </thead>
            <tbody>
              {listProducts.map((product, index) => (
                <ListProduct key={index} product={product} />
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.actionButtons}>
          <button
            className={styles.addButton}
            onClick={() => (window.location.href = "/home/produto/create")}
          >
            <span className={styles.iconWrapper}>
              <ShoppingCart className={styles.buttonIcon} />
            </span>
            CADASTRAR NOVO PRODUTO
          </button>
        </div>
      </div>
    </div>
  );
}