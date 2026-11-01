import { createContext, useState, useMemo } from 'react';

//Creamos el contexto
export const ClimaContext = createContext(null);

// Componente Proveedor que envuelve la lógica y memoiza el valor
export function ClimaProvider({ children }) {
  const [datosTiempo, setDatosTiempo] = useState(null); //No tenemos hasta que nos los de la AEMET
  const [mensajeInfo, setMensajeInfo] = useState({ texto: '', tipo: '' });
  const [fecha, setfecha] = useState(0); //Comenzamos con el día de hoy

  //Memoización del objeto para evitar renders innecesarios en los componentes hijos
  const valorClima = useMemo(() => ({
    datosTiempo, setDatosTiempo,
    mensajeInfo, setMensajeInfo,
    fecha, setfecha
  }), [datosTiempo, mensajeInfo, fecha]);

  return (
    <ClimaContext.Provider value={valorClima}>
      {children}
    </ClimaContext.Provider>
  );
}