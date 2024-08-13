import Navbar from "../../components/Navbar/Navbar";
import styles from "./Sales.module.css";
import React from "react";
import ListSales from "../../components/ListSales/ListSales.js";
import PaymentReceipt from "../../components/PaymentReceipt/PaymentReceipt.js";
import useListSales from "../../hooks/useListSales.js";

const Sales = () => {
  const {
    selectSales,
    setSelectSales,
    openModal,
    setOpenModal,
    sales,
    loading,
    windowWidth,
  } = useListSales();

  console.log(sales);

  if (loading) {
    return <div>Loading....</div>;
  }

  return (
    <div className={styles.container}>
      {windowWidth <= 480 ? (
        <PaymentReceipt
          open={openModal}
          onClose={() => {
            setOpenModal(true);
          }}
          selectSales={selectSales}
          setOpenModal={setOpenModal}
        />
      ) : (
        ""
      )}
      <Navbar />
      <div className={styles.infoRectangle}>
        <table className={styles.userInfo}>
          <thead>
            <tr>
              <th>ID.VENDAS</th>
              <th>NOME</th>
              <th>CPF</th>
              <th className={styles.noShow}>E-MAIL</th>
              <th className={styles.noShow}>QTD.ITENS</th>
              <th className={styles.noShow}>VALOR</th>
              <th className={styles.noShow}>TROCO</th>
              <th>COMPROVANTE</th>
            </tr>
          </thead>
          <tbody className={styles.containerList}>
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
      {windowWidth > 480 ? (
        <PaymentReceipt
          open={openModal}
          onClose={() => {
            setOpenModal(true);
          }}
          selectSales={selectSales}
          setOpenModal={setOpenModal}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Sales;
