import { useState } from "react";
import { toast } from "react-toastify";

const useInsertUser = () => {
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNameChange = (e) => {
    const inputValue = e.target.value;
    const filteredValue = inputValue.replace(/[^a-zA-Z.\s]/g, "");
    setName(filteredValue);
  };

  const handleUserChange = (e) => {
    const inputValue = e.target.value;
    const filteredValue = inputValue.replace(/[^a-zA-Z.\s]/g, "");
    setUser(filteredValue);
  };

  const handleRegister = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user,
          name,
          company,
          cnpj,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.type === "s") {
          toast.success(data.message);
          setName("");
          setUser("");
          setCompany("");
          setCnpj("");
        } else if (data.type === "e") {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error("Erro ao registrar usuário:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    setUser,
    name,
    setName,
    company,
    setCompany,
    cnpj,
    setCnpj,
    loading,
    handleUserChange,
    handleNameChange,
    handleRegister,
  };
};

export default useInsertUser;
