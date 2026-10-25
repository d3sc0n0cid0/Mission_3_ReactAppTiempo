import Buscador from './apartados/barraBuscador'
import Mensaje from './apartados/mensaje'

import { ClimaContext } from '../../App.jsx';

import { useContext } from "react";
export default function Header(){
    let {setfecha} = useContext(ClimaContext);
    return(
        <div>
            <Buscador/>
            {/*Mensaje de error/Cargando*/}
            <Mensaje/>

            <button onClick = {()=>setfecha(0)}>Hoy</button>
            <button onClick = {()=>setfecha(1)}>Mañana</button>
        </div>
    )
}