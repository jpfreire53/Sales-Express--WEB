import styles from "./Navbar.module.css";
import { Link, useLocation } from "react-router-dom";
//import logo from "../../assets/icons/sales_express.png";
import iconUser from "../../assets/icons/account_circle_black_24dp.svg";
import iconSales from "../../assets/icons/receipt_black_24dp.svg";
import iconUserBlue from "../../assets/icons/account_circle_blue_24dp.svg";
import iconSalesBlue from "../../assets/icons/receipt_blue_24dp.svg";
import iconLogout from "../../assets/icons/logout_black_24dp.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MenuIcon } from "lucide-react"
import axios from "axios";
import Cookies from "js-cookie";

const Navbar = () => {
  const location = useLocation();

  const isActiveLink = (pathname) => {
    return location.pathname === pathname;
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:3000/logout", {} ,{
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        Cookies.remove("idUser");
        Cookies.remove("userType");
        toast.success("Logout bem sucedido");
        window.location.href = "/";
      } else {
        toast.error("Erro ao fazer logout");
      }
    } catch (error) {
      console.error("Erro ao fazer logout", error);
    }
  };

  return (
    <header className={styles.containerNavP}>
      <ToastContainer />
      <MenuIcon width={40} height={40} className={styles.logoImg} color="#778DA9" />
      <nav className={styles.containerNav}>
        <button
          onClick={() => window.location.href = "/home/user"}
          className={
            isActiveLink("/home/user") ? styles.activeLink : styles.Links
          }
        >
          <img
            src={isActiveLink("/home/user") ? iconUserBlue : iconUser}
            alt="iconUser"
            className={styles.Icon}
          />
        </button>

        <button
          onClick={() => window.location.href = "/home/vendas"}
          className={
            isActiveLink("/home/vendas") ? styles.activeLink : styles.Links
          }
        >
          <img
            src={isActiveLink("/home/vendas") ? iconSalesBlue : iconSales}
            alt="iconSales"
            className={styles.Icon}
          />
        </button>

        <button className={styles.btnLogout} onClick={handleLogout}>
          <img src={iconLogout} alt="iconLogout" className={styles.Icon} />
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
