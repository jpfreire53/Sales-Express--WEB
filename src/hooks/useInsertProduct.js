import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const useInserProduct = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [sku, setSku] = useState("");
    const [loading, setLoading] = useState(false);


    const handleInsertProduct = async () => {
        setLoading(true)
        if (name === "" || description === "" || sku === "") {
            setLoading(false)
            toast.error("Preencha todos os campos para criar o produto.")
        }
        await axios.post("http://localhost:3000/product/register", {
            name,
            description,
            sku
        }, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.status === 200) {
                setLoading(false);
                toast.success(response.data.message);
                setName("");
                setDescription("");
                setSku("");
            }
        }).catch((error) => {
            console.log(error)
            if (error.response.status === 400) {
                setLoading(false)
                toast.error(error.response.data.message)
            }

            if (error.response.status === 500) {
                setLoading(false)
                toast.error(error.response.data.message)
            }
        })
    }

    return {
        name,
        setName,
        description,
        setDescription,
        sku,
        setSku,
        loading,
        handleInsertProduct
    }
}

export default useInserProduct;