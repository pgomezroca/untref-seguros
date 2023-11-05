

const Propiedades=()=>{
  const propiedades=["casa",'departamento',"oficina"];
return (
  <>
  <ul>
  {
    propiedades.map((propiedad,index)=>(
      <li key={index}>{propiedad}</li>
    ))
  }

  </ul>
  
  </>
)
  
}
export default Propiedades;