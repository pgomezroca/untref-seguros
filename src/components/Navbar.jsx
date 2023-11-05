import { BrowserRouter, Link, Router, Routes } from "react-router-dom"
import navStyle from "../styles/nav.module.css"

const Navbar=()=>{
  return(
    <>
    <nav className={navStyle.container}>
    <div className={navStyle.logo}>
    <h1 className={navStyle.title}>Tu cotizador de seguros OnLine</h1>
    </div>
    <div className={navStyle.enlaces}>
      <Link className={navStyle.enlace}   to="/">Cotizacion</Link>
      <Link  className={navStyle.enlace}   to="/historial">Historial de cotizaciones</Link>
    </div>  
      </nav> 
      
    </>
  )
}
export default Navbar;