import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { ShoppingCart, DollarSign, Package } from 'lucide-react'
import Navbar from '../../components/Navbar/Navbar'
import useListSales from '../../hooks/useListSales'
import styles from "./DashBoard.module.css"

const data = [
  { name: 'Jan', vendas: 4000 },
  { name: 'Fev', vendas: 3000 },
  { name: 'Mar', vendas: 5000 },
  { name: 'Abr', vendas: 4500 },
  { name: 'Mai', vendas: 3500 },
  { name: 'Jun', vendas: 4800 },
]

export default function Dashboard() {
    const { sales } = useListSales();
    const [countSales, setCountSales] = useState(0);
    const [countProducts, setCountProducts] = useState(0);
    const [countValueTotal, setCountValueTotal] = useState(0);

    useEffect(() => {
        if (sales.length > 0) {
          let countSales = sales.length;
          setCountSales(countSales)

          let soma = sales.reduce((total, sale) => total + sale.sale.value, 0)
          setCountValueTotal(soma/100)

          const totalProducts = sales.reduce((total, sale) => total + sale.items.length, 0);
          setCountProducts(totalProducts)

        }
        console.log(sales)
    }, [sales])


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
              <BarChart width={800} height={300} data={data}>
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
    )
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
  )
}