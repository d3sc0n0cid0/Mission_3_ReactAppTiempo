/*Sacada de la presentación de clase*/
import { useState, useEffect } from "react";

export default function Reloj() {
  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setHora(new Date()), 1000);
    // Limpieza: al desmontar o antes de re-ejecutar
    return () => clearInterval(id);
  }, []); // [] → solo una vez, al montar

  return <p>{hora.toLocaleTimeString()}</p>;
}