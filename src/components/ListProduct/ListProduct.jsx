import styles from "./ListProduct.module.css";

export default function ListProduct({ product }) {

  return (
    <tr key={product.id} className={styles.containerUserInfo}>
      <td className={styles.id}>{product.id}</td>
      <td className={styles.name}>{product.name}</td>
      <td className={styles.cpf}>{product.description}</td>
      <td className={styles.email}>{product.sku}</td>
    </tr>
  );
}
