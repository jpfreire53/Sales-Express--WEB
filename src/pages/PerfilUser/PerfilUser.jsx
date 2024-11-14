import styles from "./Perfil.module.css";
import { User2Icon } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import useListPerfil from "../../hooks/useListPerfil";
import useListSales from "../../hooks/useListSales";
import { useEffect, useState } from "react";

const PerfilUser = () => {
    const { user } = useListPerfil();
    const { sales } = useListSales();
    const [filteredSalesData, setFilteredSalesData] = useState([]);

    useEffect(() => {
        if (sales.length > 0) {
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth();
            const currentYear = currentDate.getFullYear();

            const parseDate = (dateString) => {
                if (!dateString || typeof dateString !== "string") {
                    return new Date("");
                }
                const [day, month, year] = dateString.split("/").map(Number);
                return new Date(year, month - 1, day);
            };

            const filteredSales = sales.filter((sale) => {
                const saleDate = parseDate(sale.sale.date);
                if (isNaN(saleDate)) return false;

                const saleMonth = saleDate.getMonth();
                const saleYear = saleDate.getFullYear();

                const isWithinLastSixMonths =
                    (saleYear === currentYear && saleMonth <= currentMonth && saleMonth >= currentMonth - 5) ||
                    (saleYear === currentYear - 1 && saleMonth >= 12 - (5 - currentMonth));

                return isWithinLastSixMonths;
            });

            const salesByMonth = Array.from({ length: 6 }, (_, i) => {
                const monthIndex = (currentMonth - i + 12) % 12;
                const monthName = new Date(0, monthIndex).toLocaleString("default", { month: "short" });

                const totalSales = filteredSales
                    .filter((sale) => parseDate(sale.sale.date).getMonth() === monthIndex)
                    .reduce((sum, sale) => sum + sale.sale.value, 0);

                return { name: monthName, vendas: totalSales / 100 };
            }).reverse();

            setFilteredSalesData(salesByMonth);
        }
    }, [sales]);

    return (
        <div className={styles.container}>
            <div className={styles.containerUserInfo}>
                <div className={styles.iconText}>
                    <User2Icon width={90} height={90} />
                    <label>{user.user}</label>
                </div>
                <button
                    onClick={() => (window.location.href = "/dashboard")}
                    className={styles.btnDash}
                >
                    Voltar para a Dashboard
                </button>
            </div>

            <div className={styles.inputContainer}>
                <div>
                    <label>Nome</label>
                    <input className={styles.inputStyles} value={user.name} placeholder="Seu Nome" disabled />
                </div>
                <div>
                    <label>CNPJ</label>
                    <input className={styles.inputStyles} value={user.cnpj} placeholder="Seu CNPJ" disabled />
                </div>
                <div>
                    <label>Empresa</label>
                    <input className={styles.inputStyles} value={user.company} placeholder="Sua Empresa" disabled />
                </div>
            </div>

            <div className={styles.containerChart}>
                <h2 className={styles.subTitle}>Vendas Mensais</h2>
                <BarChart width={400} height={300} data={filteredSalesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="vendas" fill="#8884d8" />
                </BarChart>
            </div>
        </div>
    );
};

export default PerfilUser;
