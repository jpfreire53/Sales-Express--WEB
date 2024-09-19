import axios from "axios";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";

const useListProduct = () => {
    const [listProducts, setListProducts] = useState([]);
    const [loading, setLoading] = useState(false)

    const handleListProduct = async () => {
        setLoading(true)
        await axios.get("http://localhost:3000/product/listar", {
            withCredentials: true
        }).then((response) => {
            if (response.status === 200) {
                setLoading(false)
                setListProducts(response.data.products)
            }
        }).catch((error => {
            if (error.response.status === 400) {
                setLoading(false)
                toast.error(error.response.data.message)
            }
        }))
    }

    useEffect (() => {
        handleListProduct();
    }, [])

    return {
        listProducts,
        loading
    }
}

export default useListProduct;