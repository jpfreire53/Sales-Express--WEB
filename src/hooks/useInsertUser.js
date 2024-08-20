import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const useInsertUser = () => {
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [userType, setUserType] = useState("");
  const [role, setRole] = useState("");
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

      const response = await axios.post("http://localhost:3000/register", {
          user,
          name,
          company,
          cnpj,
          userType,
          role      
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

      if (response.status === 200) {
        const data = response.data
        if (data.type === "s") {
          toast.success(data.message);
          setName("");
          setUser("");
          setCompany("");
          setCnpj("");
          setUserType("");
          setRole("");
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
    userType,
    setUserType,
    role,
    setRole,
    loading,
    handleUserChange,
    handleNameChange,
    handleRegister,
  };
};

export default useInsertUser;
