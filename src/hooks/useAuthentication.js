import { useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";

const useAuthentication = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const response = await axios.post("http://localhost:3000/login",
       { 
        user: user, 
        password: password 
      },
       {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
       }
      );

      if (
        user === "" ||
        user === null ||
        password === "" ||
        password === null
      ) {
        toast.error("Preencha os campos para realizar o Login!");
      } else if (response.status === 401) {
        toast.error("Sessão expirada! Faça o Login novamente!");
        window.location.href = "/login";
      } else if (response.status === 200) {
        Cookies.set("token", response.data.token)
        Cookies.set("idUser", response.data.user.id)
        toast.success("Usuário Logado com sucesso!");
        window.location.href = "/home/user";
      } else {
        toast.error("Erro ao fazer o login");
      }
    } catch (error) {
      console.error("Error during login: ", error);
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  return { user, password, setUser, setPassword, handleSubmit, loading };
};

export default useAuthentication;
