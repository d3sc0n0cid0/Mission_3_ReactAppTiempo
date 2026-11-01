import './App.css' //Si se está usando no se porque webiArena dice que no, añade al fondo a la web
import Header from './apartados/header/header.jsx'
import Seccion from './apartados/section/section.jsx'
import { ClimaProvider } from './context/ClimaContext.jsx';
import {HabilitadoProvider} from './context/HabilitadoContext.jsx';

function App() {

  return (
    <>
      <noscript>
          <p>Este mensaje solo se muestra si JavaScript está desactivado</p>
      </noscript>
      <ClimaProvider>
        <header>
          <HabilitadoProvider>
            <Header />
          </HabilitadoProvider>
        </header>
        <section>
          <Seccion/>
        </section>
      </ClimaProvider>
    </>
  )
}

export default App
