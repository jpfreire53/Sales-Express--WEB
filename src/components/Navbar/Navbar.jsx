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
import { MenuIcon, User, XIcon } from "lucide-react"
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Navbar = () => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(Cookies.get("expanded") === "true");

  const isActiveLink = (pathname) => {
    return location.pathname === pathname;
  };

  const toggleNavBar = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    Cookies.set('expanded', newState, { expires: 7 });
  }

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

  useEffect(() => {
    const savedState = Cookies.get('expanded') === 'true';
    setIsExpanded(savedState);
  }, []);

  return (
    <header className={`${styles.containerNavP} ${isExpanded ? styles.width12 : styles.width8}`}>
      <ToastContainer />
      
      {!isExpanded ? 
        <MenuIcon onClick={toggleNavBar} width={40} height={40} className={styles.logoImg} color="#778DA9" />        
        :
        <XIcon onClick={toggleNavBar} width={40} height={40} className={styles.logoImg} color="#778DA9" />
      }

      <nav className={styles.containerNav}>
        {isExpanded &&
          <button
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "/home/user/perfil"
          }}
          className={
            isActiveLink("/home/user/perfil") ? styles.activeLink : styles.Links
          }
        >
          <User
            src={isActiveLink("/home/user") ? iconUserBlue : iconUser}
            alt="iconUser"
            className={styles.Icon}
          />
          {isExpanded && <p>Seu Perfil</p>}
        </button>}

        <button
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "/home/user"
          }}
          className={
            isActiveLink("/home/user") ? styles.activeLink : styles.Links
          }
        >
          <img
            src={isActiveLink("/home/user") ? iconUserBlue : iconUser}
            alt="iconUser"
            className={styles.Icon}
          />
          {isExpanded && <p>Usuários</p>}
        </button>

        <button
          onClick={(e) =>{
              e.preventDefault();
              window.location.href = "/home/vendas"
            }}
          className={
            isActiveLink("/home/vendas") ? styles.activeLink : styles.Links
          }
        >
          <img
            src={isActiveLink("/home/vendas") ? iconSalesBlue : iconSales}
            alt="iconSales"
            className={styles.Icon}
          />
          {isExpanded && <p>Vendas</p>}
        </button>

        <button className={styles.btnLogout} onClick={handleLogout}>
          <img src={iconLogout} alt="iconLogout" className={styles.Icon} />
          {isExpanded && <p>Logout</p>}
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
