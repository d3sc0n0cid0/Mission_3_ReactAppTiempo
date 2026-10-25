import { useContext } from "react";
import { ClimaContext } from "../../../App.jsx";

export default function Dia() {
  const { fecha } = useContext(ClimaContext);

  // 1. Convertimos 'fecha' a número puro (0, 1, etc.)
  const diasASumar = Number(fecha) || 0;

  // 2. Calculamos los milisegundos a sumar (1 día = 86,400,000 ms)
  const MS_POR_DIA = 24 * 60 * 60 * 1000;
  
  // 3. Creamos la nueva fecha sumando los milisegundos directamente
  const fechaCalculada = new Date(Date.now() + (diasASumar * MS_POR_DIA));

  // 4. Formateamos directamente con toLocaleDateString (formato es-ES)
  const fechaFormateada = fechaCalculada.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  console.log("Fecha offset:", diasASumar, "--> Resultado:", fechaFormateada);

  return (
    <p>{fechaFormateada}</p>
  );
}