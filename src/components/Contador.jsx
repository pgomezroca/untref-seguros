import { useState } from "react"

const Contador=()=>{
const [numero,setNumero]=useState(1)
const handleaumentar=()=>{
  setNumero(numero+1)
}
  return(
    <>
    <h2>mi primer {numero}</h2>
    <button onClick={handleaumentar}>aumentar</button>
    
    </>
  )

}
export default Contador;