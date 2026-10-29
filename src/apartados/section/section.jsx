
import { useContext } from "react";
import { ClimaContext } from "../../App.jsx";

import TarjetaInicio from './apartados/tarjetaInicio.jsx';
import TarjetaDetalles from "./apartados/tarjetaDetalles.jsx";
import TarjetaPrincipal from "./apartados/tarjetaPrincipal.jsx"

export default function Seccion(){
    const { datosTiempo, fecha } = useContext(ClimaContext);

    if (!datosTiempo) {
        return <p>Busca un municipio para consultar el tiempo.</p>;
    }

    //Extraemos el día correspondiente al índice (0 = Hoy, 1 = Mañana, etc.)
    const prediccionDia = datosTiempo[0]?.prediccion?.dia[Number(fecha) || 0];

    return(
        <div>
            <div>
                <TarjetaInicio prediccionDia={prediccionDia}/>
            </div>
            <div>
                <TarjetaPrincipal prediccionDia={prediccionDia}/>
            </div>
            <div>
                <TarjetaDetalles prediccionDia={prediccionDia}/>
            </div>
        </div>
    )
}