import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const useListPerfil = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const handleSearchUser = async () => {
            try {
                let idUser = Cookies.get("idUser");
    
                if (idUser !== null || idUser !== undefined) {
                    let response = await axios.get(`http://localhost:3000/user/${idUser}`, {
                        withCredentials: true,
                    })

                    if (response.status === 200) {
                        setUser(response.data[0])
                    }

                }
    
            } catch (error) {
                console.error(error.message)
            }
        }
        
        handleSearchUser();
    }, [])

    return {
        user
    }
}

export default useListPerfil;