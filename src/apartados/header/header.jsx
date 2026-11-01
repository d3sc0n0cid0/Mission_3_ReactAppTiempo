import Buscador from './apartados/barraBuscador'
import Mensaje from './apartados/mensaje'
import './header.css';
import { ClimaContext } from '../../context/ClimaContext';
import { useContext, createContext,useState } from "react";
import {HabilitadoContext} from '../../context/HabilitadoContext'

export default function Header(){
    let {setfecha} = useContext(ClimaContext);
    let { bDesabilitado } = useContext(HabilitadoContext);

    return(
        <div>
            {/*Barra de búsqueda + boton bucar + pdf imagen*/}
            <Buscador/>
            {/*Mensaje de error/Cargando*/}
            <Mensaje/>
            {/*Botones para hoy y mañana*/}
            <div className='botonesDia'>
                <button  className="botonMostrarTiempoDe" disabled={bDesabilitado} onClick = {()=>setfecha(0)}>Hoy</button>
                <button className="botonMostrarTiempoDe" disabled={bDesabilitado} onClick = {()=>setfecha(1)}>Mañana</button>
            </div>
        </div>
    )
}