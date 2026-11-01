import Buscador from './apartados/barraBuscador'
import Mensaje from './apartados/mensaje'
import './header.css';
import { ClimaContext } from '../../context/ClimaContext';
import { useContext, createContext,useState } from "react";

export const HabilitadoContext = createContext(); //Para evitar el Prop Drilling

export default function Header(){
    let {setfecha} = useContext(ClimaContext);

    //Manejo de funciones
    const [bDesabilitado, setDeshabilitado] = useState(true);
        //Bloquear controles
    function bloqeuar(){ setDeshabilitado(true); }
    function desBloqeuar(){ setDeshabilitado(false); }

    return(
        <div>
            <HabilitadoContext.Provider value={{bDesabilitado,bloqeuar,desBloqeuar}}>
                {/*Barra de búsqueda + boton bucar + pdf imagen*/}
                <Buscador/>
                {/*Mensaje de error/Cargando*/}
                <Mensaje/>
                {/*Botones para hoy y mañana*/}
                <div className='botonesDia'>
                    <button  className="botonMostrarTiempoDe" disabled={bDesabilitado} onClick = {()=>setfecha(0)}>Hoy</button>
                    <button className="botonMostrarTiempoDe" disabled={bDesabilitado} onClick = {()=>setfecha(1)}>Mañana</button>
                </div>
            </HabilitadoContext.Provider>
        </div>
    )
}