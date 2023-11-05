import { useState, useEffect } from "react";
import formcss from "../styles/Formulario.module.css";
import Contador from "./Contador"
const Formulario = () => {
  const [tipoPropiedad, setTipoPropiedad] = useState("");
  const [inputmetros, setInputMetros] = useState(1);
  const [cotizacion, setCotizacion] = useState(0);
  const [ubicacion, setUbicacion] = useState("");
  const [opciones, setOpciones] = useState({});
  const [factores, setFactores] = useState({});
  const [error, setError] = useState('')
  const [cotizacionRealizada, setCotizacionRealizada] = useState(false);
  useEffect(() => {
    // Cargar opciones desde "opciones.json"
    fetch("api/opciones.json")
      .then((response) => response.json())
      .then((data) => setOpciones(data))
      .catch((error) => console.error("Error al cargar opciones", error));

    // Cargar factores desde "factores.json"
    fetch("/api/Factores.json")
      .then((response) => response.json())
      .then((data) => setFactores(data))
      .catch((error) => console.error("Error al cargar factores", error));
  }, []);

    const handleTipoPropiedadChange = (e) => {
      setTipoPropiedad(e.target.value);
    };

    const handleUbicacionChange = (e) => {
      setUbicacion(e.target.value);
    };

    const handleCotizar = (e) => {
      e.preventDefault();
      let cotizacion = 0;
      //valido que el usuario haya elegido una opcion
      if (!tipoPropiedad || !ubicacion ||!inputmetros)  {
        setError('Por favor, complete todos los campos antes de cotizar.');
        return;
      }else {
        setError(''); // Limpio el mensaje de error si no hay errores
      }
      //valido que haya puesto un numero valido de metros
      if(inputmetros<=0){
         setError('Por favor ingrese un numero valido de metros cuadrados. Debe ser mayor que 0')
      }else{setError('')};
      //el json que traje ya esta convertido en un objeto, le aplico .find
      const factorTipoPropiedad = factores.tipoPropiedad.find(opcion => opcion[tipoPropiedad]) ;
      const factorUbicacion = factores.ubicacion.find(opcion => opcion[ubicacion]) ;

      //extraigo el valor del elegido
      const factorTipopropiedadValue=factorTipoPropiedad[tipoPropiedad];
      console.log(factorTipopropiedadValue);
      const factorUbicacionValue=factorUbicacion[ubicacion]

      //calculo de la cotizacion
      cotizacion = inputmetros * factorTipopropiedadValue* factorUbicacionValue;
      cotizacion = cotizacion.toFixed(2);
      ;
      setCotizacion(cotizacion);//seteo el estado de la cotizacion
      setCotizacionRealizada(true);//lo pongo en true para renderizar
    };
       
    const saveData = () => {
      
      const cotizacionActual = {
        tipo: tipoPropiedad,
        ubicacion: ubicacion,
        metros: inputmetros,
        cotizacion: cotizacion,
      };

      //traer lo que esta en el localStorage
      const historialCotizaciones = JSON.parse(localStorage.getItem('historialCotizaciones') || '[]');

      // Agregar la cotización actual al historial
      historialCotizaciones.push(cotizacionActual);

      // Guardar el historial actualizado en localStorage
      localStorage.setItem('historialCotizaciones', JSON.stringify(historialCotizaciones));

      // Limpia los campos después de guardar
      setTipoPropiedad("");
      setUbicacion("");
      setInputMetros(1);
      setCotizacion(0);
    };
    const verData=()=>{
      alert('viendo data')
    }
    return (
      <>
        <h1 className={formcss.titulo}>Datos para cotización</h1>
        <section className={formcss.formContainer}>

        <form className={formcss.container}>

          <select
            value={tipoPropiedad}
            onChange={handleTipoPropiedadChange}
            className={formcss.select}
            required
          >
            <option value="" disabled>Selecciona el tipo de propiedad</option>
            {opciones.tipoPropiedad && opciones.tipoPropiedad.map((opcion) => (
              <option key={opcion.value} value={opcion.value}>
                {opcion.label}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Metros cuadrados"
            onChange={(e) => setInputMetros(e.target.value)}
            className={formcss.input}
            required
          />
          

          <select
            value={ubicacion}
            onChange={handleUbicacionChange}
            className={formcss.select}
            required
          >
            <option value="" disabled>Selecciona la ubicación</option>
            {opciones.ubicacion && opciones.ubicacion.map((opcion) => (
              <option key={opcion.value} value={opcion.value}>
                {opcion.label}
              </option>
            ))}
          </select>

          <button className={formcss.boton} onClick={handleCotizar}>
            Cotizar
          </button>
            {error && <p className={formcss.error}>{error}</p>}
        </form>
        </section>

        {cotizacionRealizada && (
          <div className={formcss.informes}>
         <h2 className={formcss.cotizacion}>La cotizacion es de aproximadamente: {cotizacion} $</h2> 
         <button onClick={saveData} className={formcss.botoncentrado} >Guardar cotizacion  </button>
        </div>)}
      </>
    );
  }
  export default Formulario;
