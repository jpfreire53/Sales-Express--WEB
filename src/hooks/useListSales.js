import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const useListSales = () => {
  const [selectSales, setSelectSales] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let idUser = Cookies.get("idUser");

        if (idUser !== "" || idUser !== undefined) {
          const response = await axios.get(`http://localhost:3000/home/sales/${idUser}`, {
            withCredentials: true,
          });

          if (response.status === 200) {
            setSales(response.data.sales);
            setLoading(false);
          } 

      }
      } catch (error) {
        console.error("Erro ao listar a(s) venda(s): " + error.message);
        setLoading(false);
      }
    };

    fetchData();

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    selectSales,
    setSelectSales,
    openModal,
    setOpenModal,
    sales,
    loading,
    windowWidth,
  };
};

export default useListSales;
