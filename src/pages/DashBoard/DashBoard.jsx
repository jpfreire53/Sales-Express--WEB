import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { ShoppingCart, DollarSign, Package } from 'lucide-react'
import Navbar from '../../components/Navbar/Navbar'
import useListSales from '../../hooks/useListSales'
import styles from "./DashBoard.module.css"

export default function Dashboard() {
    const { sales } = useListSales();
    const [countSales, setCountSales] = useState(0);
    const [countProducts, setCountProducts] = useState(0);
    const [countValueTotal, setCountValueTotal] = useState(0);
    const [filteredSalesData, setFilteredSalesData] = useState([]);

    useEffect(() => {
      if (sales.length > 0) {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        const parseDate = (dateString) => {
          if (!dateString || typeof dateString !== 'string') {
              return new Date('');
          }
          const [day, month, year] = dateString.split('/').map(Number);
          return new Date(year, month - 1, day);
      };
        
        const filteredSales = sales.filter(sale => {
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
            const monthName = new Date(0, monthIndex).toLocaleString('default', { month: 'short' });

            const totalSales = filteredSales
                .filter(sale => parseDate(sale.sale.date).getMonth() === monthIndex)
                .reduce((sum, sale) => sum + sale.sale.value, 0);

            return { name: monthName, vendas: totalSales / 100 };
          }).reverse();

          setFilteredSalesData(salesByMonth);

          let countSales = filteredSales.length;
          setCountSales(countSales);

          let soma = filteredSales.reduce((total, sale) => total + sale.sale.value, 0);
          setCountValueTotal(soma / 100);

          const totalProducts = filteredSales.reduce((total, sale) => total + sale.items.length, 0);
          setCountProducts(totalProducts);
        }
    }, [sales]);

    return (
      <div className={styles.container}>
        <Navbar />
        <div className={styles.content}>
          <h1 className={styles.title}>Dashboard de Vendas - Supermercado</h1>
          <div className={styles.statsContent}>
              <StatCard icon={<ShoppingCart />} title="Total de Pedidos" value={countSales.toString()} />
              <StatCard icon={<DollarSign />} title="Receita Total" value={`R$ ${countValueTotal.toFixed(2)}`} />
              <StatCard icon={<Package />} title="Produtos Vendidos" value={countProducts.toString()} />
          </div>
          <div className={styles.chartContent}>
              <h2 className={styles.subTitle}>Vendas Mensais</h2>
              <BarChart width={800} height={300} data={filteredSalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="vendas" fill="#8884d8" />
              </BarChart>
          </div>
        </div>
      </div>
    );
}

function StatCard({ icon, title, value }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardIcon}>{icon}</div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardValue}>{value}</p>
      </div>
    </div>
  );
}
