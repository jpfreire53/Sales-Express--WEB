import styles from "./ListSales.module.css";
import receipt from "../../assets/icons/receipt_black_24dp.svg";

export default function ListSales({ sales, setSelectSales, setOpenModal }) {
  const formatCurrency = (value) => {
    return (value / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <tr key={sales.sale.id} className={styles.containerUserInfo}>
      <td className={styles.id}>{sales.sale.id}</td>
      <td className={styles.name}>{sales.sale.name}</td>
      <td className={styles.cpf}>{sales.sale.cpf}</td>
      <td className={styles.email}>{sales.sale.email}</td>
      <td className={styles.qtdItens}>
        {sales.items.length >= 10
          ? sales.items.length
          : "0" + sales.items.length}
      </td>
      <td className={styles.value}>{formatCurrency(sales.sale.value)}</td>
      <td className={styles.moneyChange}>
        {formatCurrency(sales.sale.moneyChange)}
      </td>
      <td className={styles.receipt}>
        <button
          className={styles.receipt}
          onClick={() => {
            setOpenModal(true);
            setSelectSales(sales);
          }}
        >
          <img src={receipt} alt="receipt" />
        </button>
      </td>
    </tr>
  );
}
