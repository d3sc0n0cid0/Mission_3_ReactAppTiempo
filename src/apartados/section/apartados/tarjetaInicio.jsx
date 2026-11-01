import Reloj from './reloj'
import Dia from './dia'
import '../section.css'
export default function TarjetaInicio({prediccionDia}){

    const tempMaxima = prediccionDia?.temperatura?.maxima;
    const tempMinima = prediccionDia?.temperatura?.minima;

    return(
        <div>
            <div className='Fecha_Temperatura'>
                <div className='fechaHora'>
                {/*fecha*/}
                    <Dia/>
                {/*hora*/}
                    <Reloj/>
                </div>
                <div className='tempMaxMin'>
                {/*Temperatura max y minima*/}
                    <p>Min: {tempMinima ?? "error al conseguir la temperatura mínima"}</p>
                    <p>Max: {tempMaxima ?? "error al conseguir la temperatura máxima"}</p>
                </div>
            </div>
        </div>
    )

}