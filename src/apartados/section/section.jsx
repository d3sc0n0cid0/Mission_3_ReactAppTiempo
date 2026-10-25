
import Reloj from './apartados/reloj'
import Dia from './apartados/dia'
export default function Seccion(){

    return(
        <div>
            <div>
                <p>dia hora /Temperatura max y min</p>
                <Dia/>
                {/*hora*/}
                <Reloj/>
            </div>
            
            <p>Caja con temperatura sensacion termica, imagen y como de nubloso</p>
            <p>viento huemdad precipitacion</p>
        </div>
    )
}