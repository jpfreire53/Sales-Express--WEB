// useHome.js
import { useEffect, useState } from "react";

const useListUser = () => {
  const [selectUser, setSelectUser] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const listarUsuarios = async () => {
      try {
        const response = await fetch("http://localhost:3000/home/user", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        }
      } catch (error) {
        console.error("Erro ao listar o usuário: " + error.message);
      } finally {
        setLoading(false);
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
