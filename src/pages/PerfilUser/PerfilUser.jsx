import styles from "./Perfil.module.css"
import { User2Icon } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useListPerfil from "../../hooks/useListPerfil";


const PerfilUser = () => {

    const { user } = useListPerfil();

    const data = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];

    return (
        <div className={styles.container}>
            <div>
                <div className={styles.containerUserInfo}>     
                    <User2Icon width={100} height={100} />
                    <label>{user.user}</label>
                </div>
                <div className={styles.line2}></div>
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
            </div>
            <div className={styles.line}></div>
            <div className={styles.chart}>
                <div className={styles.containerChart}>
                    <AreaChart
                        width={680}
                        height={400}
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                </div>
                <div className={styles.containerBTNs}>
                    <button onClick={() => window.location.href = "/home/user"} className={styles.btnDash}>Voltar para a dashboard</button>
                </div>
            </div>
        </div>
    )
}

export default PerfilUser;