import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import EditUser from "./pages/EditUser/EditUser";
import Sales from "./pages/Sales/Sales";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home/user" element={<Home />} />
          <Route path="/edituser/:id" element={<EditUser />} />
          <Route path="/home/vendas" element={<Sales />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
