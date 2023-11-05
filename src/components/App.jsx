

import Formulario from "./Formulario";
import Historial from "./Historial";
import ErrorPage from "./ErrorPage";
import Navbar from "./Navbar"
import { BrowserRouter as Router, Routes, Route,Outlet ,Link} from "react-router-dom";
import AppStyle from "../styles/App.module.css"

const titulo = "Mi app de seguros";
const App = () => {
  return (
    
    <Router>
      
      <Navbar></Navbar>
       
      <Routes>
        <Route path="/" element={<Formulario/>} />
        <Route path="/historial" element={<Historial/>} />
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
      
    </Router>

  );
};
export default App;
