import './App.css'
import Header from './apartados/header/header.jsx'
import Seccion from './apartados/section/section.jsx'
import { ClimaProvider } from './context/ClimaContext.jsx';

import { useState, useContext ,createContext } from "react";

function App() {

  return (
    <>
      <noscript>
          <p>Este mensaje solo se muestra si JavaScript está desactivado</p>
      </noscript>
      <ClimaProvider>
        <header>
          <Header/>
        </header>
        <section>
          <Seccion/>
        </section>
      </ClimaProvider>
    </>
  )
}

export default App
