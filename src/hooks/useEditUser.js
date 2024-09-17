import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const useEditUser = (id) => {
  const [openModal, setOpenModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [userData, setUserData] = useState({
    user: "",
    name: "",
    company: "",
    cnpj: "",
  });
  const [loading, setLoading] = useState(false);
  const token = Cookies.get("token")

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/${id}`, {
          withCredentials: true
        });

        if (response.status === 200) {
          setUserData(response.data[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, [id]);

  const handleSaveChanges = async () => {
    try {
      setLoading(true);

      console.log(userData)

      const response = await axios.put(`http://localhost:3000/edituser/${id}`, {
        userData: userData
      }, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (
        userData.user === null ||
        userData.user === "" ||
        userData.name === null ||
        userData.name === "" ||
        userData.company === null ||
        userData.company === "" ||
        userData.cnpj === "" ||
        userData.cnpj === null
      ) {
        toast.error("Preencha os campos para realizar a alteração no usuário!");
      } else if (response.status === 200) {
        window.location.href = "/home/user";
        toast.success("Alterações salvas com sucesso!");
      } else {
        toast.error(
          "Erro ao salvar as alterações. Verifique os dados e tente novamente."
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    openModal,
    setOpenModal,
    newPassword,
    setNewPassword,
    windowWidth,
    userData,
    setUserData,
    loading,
    handleSaveChanges,
  };
};

export default useEditUser;
