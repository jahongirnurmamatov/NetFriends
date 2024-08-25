
import './App.css'
import Home from './pages/home/Home';
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import { createRoot } from "react-dom/client";
import { BrowserRouter,Routes, Route } from "react-router-dom";

const root = createRoot(document.getElementById("root"));
function App() {
  return (
    <BrowserRouter >
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/register" element={<Register />} /> 
      <Route path="/login" element={<Login />} /> 
    </Routes>
  </BrowserRouter>
  )
}

export default App
