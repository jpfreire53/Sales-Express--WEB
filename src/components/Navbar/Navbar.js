import styles from "./Navbar.module.css";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/icons/sales_express.png";
import iconUser from "../../assets/icons/account_circle_black_24dp.svg";
import iconSales from "../../assets/icons/receipt_black_24dp.svg";
import iconUserBlue from "../../assets/icons/account_circle_blue_24dp.svg";
import iconSalesBlue from "../../assets/icons/receipt_blue_24dp.svg";
import iconLogout from "../../assets/icons/logout_black_24dp.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const location = useLocation();

  const isActiveLink = (pathname) => {
    return location.pathname === pathname;
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
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
      <img className={styles.logoImg} src={logo} alt="logo" />
      <nav className={styles.containerNav}>
        <Link
          to="/home/user"
          className={
            isActiveLink("/home/user") ? styles.activeLink : styles.Links
          }
        >
          <img
            src={isActiveLink("/home/user") ? iconUserBlue : iconUser}
            alt="iconUser"
            className={styles.Icon}
          />
          USUÁRIOS
        </Link>

        <Link
          to="/home/vendas"
          className={
            isActiveLink("/home/vendas") ? styles.activeLink : styles.Links
          }
        >
          <img
            src={isActiveLink("/home/vendas") ? iconSalesBlue : iconSales}
            alt="iconSales"
            className={styles.Icon}
          />
          VENDAS
        </Link>

        <button className={styles.btnLogout} onClick={handleLogout}>
          <img src={iconLogout} alt="iconLogout" className={styles.Icon} />
          LOG OUT
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
