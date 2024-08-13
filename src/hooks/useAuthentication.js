import { useState } from "react";
import { toast } from "react-toastify";

const useAuthentication = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ user, password }),
      });

      if (
        user === "" ||
        user === null ||
        password === "" ||
        password === null
      ) {
        toast.error("Preencha os campos para realizar o Login!");
      } else if (response.ok) {
        toast.success("Usuário Logado com sucesso!");
        window.location.href = "/home/user";
      } else if (response.status === 401) {
        toast.error("Sessão expirada! Faça o Login novamente!");
        window.location.href = "/login";
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
