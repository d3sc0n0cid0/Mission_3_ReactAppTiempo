
import Reloj from './apartados/reloj'
import Dia from './apartados/dia'

import { useContext } from "react";
import { ClimaContext } from "../../App.jsx";
export default function Seccion(){
    const { datosTiempo, fecha } = useContext(ClimaContext);

    if (!datosTiempo) {
        return <p>Busca un municipio para consultar el tiempo.</p>;
    }

    //Extraemos el día correspondiente al índice (0 = Hoy, 1 = Mañana, etc.)
    const prediccionDia = datosTiempo[0]?.prediccion?.dia[Number(fecha) || 0];

    //Extraemos directamente los datos que necesitamos para pintarlos
    const tempMaxima = prediccionDia.temperatura?.maxima;
    const tempMinima = prediccionDia.temperatura?.minima;
    const viento = prediccionDia.viento[0]?.velocidad;
    const estadoCielo = prediccionDia.estadoCielo[0]?.descripcion;

    return(
        <div>
            <div>
                {/*fecha*/}
                <Dia/>
                {/*hora*/}
                <Reloj/>
                {/*Temperatura max y minima*/}
                <p>{tempMinima}</p>
                <p>{tempMaxima}</p>
            </div>
            
            <p>Caja con temperatura sensacion termica, imagen y como de nubloso</p>
            <p>viento huemdad precipitacion</p>
        </div>
    )
}