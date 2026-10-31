import Reloj from './reloj'
import Dia from './dia'
import '../section.css'
export default function TarjetaInicio({prediccionDia}){

    const tempMaxima = prediccionDia.temperatura?.maxima;
    const tempMinima = prediccionDia.temperatura?.minima;

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
                    <p>Min: {tempMinima}</p>
                    <p>Max: {tempMaxima}</p>
                </div>
            </div>
        </div>
    )

}