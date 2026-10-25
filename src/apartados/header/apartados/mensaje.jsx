/*Este apartado contiene:
    -Mostrar mensaje de error 
    -Mostrar mensaje de cargando
 */

import {useContext} from "react";
import { ClimaContext } from '../../../App.jsx';

export default function Mensaje(){

  const {mensajeInfo} = useContext(ClimaContext);
  const {texto, tipo} = mensajeInfo;

  // Si no hay texto y no es un mensaje de carga, no renderiza nada
  if (!texto && tipo !== 'cargando') return null;

  // Configuración según el tipo de mensaje
  const configuracion = {
    error: '⚠️',
    cargando: '⏳'
  };

  // Selección de la configuración actual
  const icono = configuracion[tipo];

  return (
    <div>
        <p><span>{icono} </span>{texto}</p>
    </div>
  );
}