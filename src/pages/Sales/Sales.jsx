import Navbar from "../../components/Navbar/Navbar";
import styles from "./Sales.module.css";
import React from "react";
import ListSales from "../../components/ListSales/ListSales.jsx";
import PaymentReceipt from "../../components/PaymentReceipt/PaymentReceipt.jsx";
import useListSales from "../../hooks/useListSales.js";
import Loading from "../../components/Loading/Loading.jsx";

export default function Sales() {
  const {
    selectSales,
    setSelectSales,
    openModal,
    setOpenModal,
    sales,
    loading,
    windowWidth,
  } = useListSales();

  return (
    <div className={styles.container}>
      {loading && <Loading />}
      <Navbar />
      <div className={styles.infoRectangle}>
        <div className={styles.tableContainer}>
          <table className={styles.userInfo}>
            <thead>
              <tr>
                <th>ID.VENDAS</th>
                <th>NOME</th>
                <th>CPF</th>
                <th className={styles.hideOnMobile}>E-MAIL</th>
                <th className={styles.hideOnMobile}>QTD.ITENS</th>
                <th className={styles.hideOnMobile}>VALOR</th>
                <th className={styles.hideOnMobile}>TROCO</th>
                <th>COMPROVANTE</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale, index) => (
                <ListSales
                  key={index}
                  sales={sale}
                  setOpenModal={setOpenModal}
                  setSelectSales={setSelectSales}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <PaymentReceipt
        open={openModal}
        onClose={() => setOpenModal(false)}
        selectSales={selectSales}
        setOpenModal={setOpenModal}
      />
    </div>
  );
}