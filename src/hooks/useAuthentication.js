import { useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";

const useAuthentication = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);

      if (user === "" || password === "") {
        setLoading(false)
        toast.error("Preencha os campos para realizar o Login!");
      } else {
        let response = await axios.post("http://localhost:3000/login", { 
          user: user, 
          password: password 
        },{
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
          }
        );
          
        if (response.status === 401) {
            toast.error("Sessão expirada! Faça o Login novamente!");
            window.location.href = "/login";
        } else if (response.status === 200) {
          let token = document.cookie
          Cookies.set("idUser", response.data.user.id)
          if (token !== "" || token !== undefined) {
            console.log(token)
            setLoading(false)
            toast.success("Usuário Logado com sucesso!");
            window.location.href = "/home/user";
          }
        } else {
          setLoading(false)
          toast.error("Erro ao fazer o login");
        }
      }
    } catch (error) {
      setLoading(false)
      console.error("Error during login: ", error);
    } 
  };

  return { user, password, setUser, setPassword, handleSubmit, loading };
};

export default useAuthentication;
