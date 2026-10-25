import Buscador from './apartados/barraBuscador'
import Mensaje from './apartados/mensaje'

import { ClimaContext } from '../../App.jsx';

import { useContext } from "react";
export default function Header(){
    let {setfecha} = useContext(ClimaContext);
    return(
        <div>
            {/*Barra de búsqueda + boton bucar + pdf imagen*/}
            <Buscador/>
            {/*Mensaje de error/Cargando*/}
            <Mensaje/>
            {/*Botones para hoy y mañana*/}
            <button onClick = {()=>setfecha(0)}>Hoy</button>
            <button onClick = {()=>setfecha(1)}>Mañana</button>
        </div>
    )
}