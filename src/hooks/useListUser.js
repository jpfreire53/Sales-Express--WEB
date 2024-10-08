// useHome.js
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const useListUser = () => {
  const [selectUser, setSelectUser] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const listarUsuarios = async () => {
      try {
        setLoading(true)
        const id = Cookies.get("idUser")

        const response = await axios.get(`http://localhost:3000/user/different/${id}`, {
          withCredentials: true
        });

        if (response.status === 200) {
          setLoading(false)
          setUsers(response.data.users);
        }
      } catch (error) {
        setLoading(false)
        console.error("Erro ao listar o usuário: " + error.message);
      }
    };
    listarUsuarios();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    selectUser,
    setSelectUser,
    openModal,
    setOpenModal,
    users,
    windowWidth,
    loading,
  };
};

export default useListUser;
