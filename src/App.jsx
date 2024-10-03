 import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import EditUser from "./pages/EditUser/EditUser";
import Sales from "./pages/Sales/Sales";
import Cookies from "js-cookie";
import PerfilUser from "./pages/PerfilUser/PerfilUser";
import ProductPage from "./pages/Product/ProductPage";
import ProductCreatePage from "./pages/ProductCreatePage/ProductCreatePage";
import Dashboard from "./pages/DashBoard/DashBoard";

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
        <Route path="/home/produto" element={!isAuthenticated ? <Navigate to="/" /> : <ProductPage />} />
        <Route path="/home/produto/create" element={!isAuthenticated ? <Navigate to="/" /> : <ProductCreatePage />} />
        <Route path="/dashboard" element={!isAuthenticated ? <Navigate to="/" /> : <Dashboard />} />
        <Route exact path="/" element={isAuthenticated ? <Navigate to="/home/user" /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
