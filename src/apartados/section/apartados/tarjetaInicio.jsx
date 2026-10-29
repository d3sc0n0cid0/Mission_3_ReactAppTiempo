import Reloj from './reloj'
import Dia from './dia'

export default function TarjetaInicio({prediccionDia}){

    const tempMaxima = prediccionDia.temperatura?.maxima;
    const tempMinima = prediccionDia.temperatura?.minima;

    return(
        <div>
            {/*fecha*/}
            <Dia/>
            {/*hora*/}
            <Reloj/>
            {/*Temperatura max y minima*/}
            <p>{tempMinima}</p>
            <p>{tempMaxima}</p>
        </div>
    )

}