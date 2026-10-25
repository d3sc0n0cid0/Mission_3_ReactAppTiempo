import './App.css'
import Header from './apartados/header/header.jsx'
import Seccion from './apartados/section/section.jsx'

import { useState, useContext ,createContext } from "react";

export const ClimaContext = createContext(); //Para evitar el Prop Drilling

function App() {
  const [datosTiempo, setDatosTiempo] = useState(null); //No tenemos hasta que nos los de la AEMET
  const [mensajeInfo, setMensajeInfo] = useState({ texto: '', tipo: '' });
  const [fecha, setfecha] = useState(0); //Comenzamos con el día de hoy
  return (
    <>
      <noscript>
          <p>Este mensaje solo se muestra si JavaScript está desactivado</p>
      </noscript>
      <ClimaContext.Provider value={{ 
        datosTiempo, setDatosTiempo, 
        mensajeInfo, setMensajeInfo, 
        fecha, setfecha 
        }}>
        <header>
          <Header/>
        </header>
        <section>
          <Seccion/>
        </section>
      </ClimaContext.Provider>
    </>
  )
}

export default App
