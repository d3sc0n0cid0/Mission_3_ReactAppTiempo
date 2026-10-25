import { useContext } from "react";
import { ClimaContext } from "../../../App.jsx";

export default function Dia() {
  const { fecha } = useContext(ClimaContext);
  const diasASumar = Number(fecha) || 0;

  //Calculamos los milisegundos a sumar (1 día = 86,400,000 ms)
  const MS_POR_DIA = 24 * 60 * 60 * 1000;
  // Creamos la nueva fecha sumando los milisegundos directamente
  const fechaCalculada = new Date(Date.now() + (diasASumar * MS_POR_DIA));
  //Formateamos directamente con toLocaleDateString (formato es-ES)
  const fechaFormateada = fechaCalculada.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  return (
    <p>{fechaFormateada}</p>
  );
}