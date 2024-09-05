import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import EditUser from "./pages/EditUser/EditUser";
import Sales from "./pages/Sales/Sales";
import Cookies from "js-cookie";
import PerfilUser from "./pages/PerfilUser/PerfilUser";

function App() {
  const session = Cookies.get("idUser");

  const isAuthenticated = session && session.trim() !== "";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={!isAuthenticated ? <Navigate to="/" /> : <Register />} />
        <Route path="/home/user" element={!isAuthenticated ? <Navigate to="/" /> : <Home />} />
        <Route path="/edituser/:id" element={!isAuthenticated ? <Navigate to="/" /> : <EditUser />} />
        <Route path="/home/vendas" element={!isAuthenticated ? <Navigate to="/" /> : <Sales />} />
        <Route path="/home/user/perfil" element={!isAuthenticated ? <Navigate to="/" /> : <PerfilUser />} />
        <Route exact path="/" element={isAuthenticated ? <Navigate to="/home/user" /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
