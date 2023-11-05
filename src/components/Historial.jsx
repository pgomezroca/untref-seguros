import { useEffect, useState } from "react";
import historialStyle from "../styles/historial.module.css"


function HistorialCotizaciones() {
  
  const [cotizaciones, setCotizaciones] = useState([]);

  // Función para cargar las cotizaciones desde el localStorage
  useEffect(() => {
    const cotizacionesGuardadas = JSON.parse(localStorage.getItem('historialCotizaciones') || '[]');
    setCotizaciones(cotizacionesGuardadas);
  }, []);
  function handleBorrarCotizacion(index){
   const copiaCotizaciones= [...cotizaciones]
   copiaCotizaciones.splice(index,1);//borra 1 elemento que se encuentra en la posicion index
   setCotizaciones(copiaCotizaciones)
   localStorage.setItem('historialCotizaciones', JSON.stringify(copiaCotizaciones));
  }
  return (
    <div>
      <h1 className={historialStyle.titulo}>Historial de Cotizaciones</h1>
      <table className={historialStyle.table}>
        <thead>
          <tr>
            <th>Tipo de Propiedad</th>
            <th>Ubicación</th>
            <th>Metros Cuadrados</th>
            <th>Cotización</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cotizaciones.map((cotizacion, index) => (
            <tr key={index}>
              <td>{cotizacion.tipo}</td>
              <td>{cotizacion.ubicacion}</td>
              <td>{cotizacion.metros}</td>
              <td>${cotizacion.cotizacion}</td>
              <td>
                <button onClick={() => handleBorrarCotizacion(index)}>
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistorialCotizaciones;