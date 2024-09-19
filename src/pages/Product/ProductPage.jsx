import ListProduct from "../../components/ListProduct/ListProduct";
import Loading from "../../components/Loading/Loading";
import Navbar from "../../components/Navbar/Navbar";
import useListProduct from "../../hooks/useListProduct";
import styles from "./ProductPage.module.css";
import { ShoppingCart } from "lucide-react";

const ProductPage = () => {
    const { listProducts, loading } = useListProduct();
    
    return (
        <div className={styles.container}>
            {loading && <Loading />}
            <Navbar />
            <div className={styles.infoRectangle}>
                <table className={styles.userInfo}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOME</th>
                        <th>DESCRIÇÃO</th>
                        <th>SKU</th>
                    </tr>
                </thead>
                <tbody className={styles.containerList}>
                    {listProducts.map((product, index) => (
                        <ListProduct
                            key={index}
                            product={product}
                        />
                    ))}
                </tbody>
                </table>
            </div>
            <div className={styles.containerBtn}>
                <div className={styles.containerAdd}>
                    <div className={styles.quadradoAzul}>
                        <ShoppingCart className={styles.logoCad} />
                    </div>
                    <button className={styles.linkRetangular} onClick={() => window.location.href = "/home/produto/create"}>
                        CADASTRAR NOVO PRODUTO
                    </button>
                </div>
            </div>
    </div>
    )
}

export default ProductPage;