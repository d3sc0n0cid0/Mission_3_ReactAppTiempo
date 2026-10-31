// Caja con temperatura sensacion termica, imagen y como de nubloso

export default function TarjetaPrincipal({prediccionDia}){
/* Así es como tiene guardadas las horas
[
  { "hora": 6, "value": 12 },
  { "hora": 12, "value": 20 },
  { "hora": 18, "value": 22 },
  { "hora": 24, "value": 15 }
] */
    const datosHoras = prediccionDia?.temperatura?.dato || [];
    const dia = new Date();
    const horaActual = dia.getHours();

    let horaMenorDiferencia=24;
    let diferenciaHoras;
    let menorDiferencia=24;
    //Sacamos la hora que esté menos alejada de la hora actual para que sea nuestra hora actual
    datosHoras.forEach(item => {
        //console.log(`A las ${item.hora}:00h -> ${item.value}°C`);

        diferenciaHoras = Math.abs(item.hora-horaActual);// 20-6 = 14

        if(diferenciaHoras<=menorDiferencia){ // 14<=horaMenorDiferencia?-> horaMenorDiferencia = 6
            menorDiferencia = diferenciaHoras;
            horaMenorDiferencia = item.hora;
        }
    });
     //Sacamos la temperatura de la hora más cercana
    const tempActualEstimada = datosHoras.find(
        (item) => item.hora === horaMenorDiferencia
    )?.value ?? '--';
     //Sacamos la sensación termica de la hora mñas cercana
    const sensTermicaDatos = prediccionDia?.sensTermica?.dato || [];
    const sensTermicaEstimada = sensTermicaDatos.find(
        (item) => item.hora === horaMenorDiferencia
    )?.value ?? '--';

    //Sacamos la descripción de la hora más cercana
        //Lo da por tramos 00-24, 6-12 etc.:(
    const estadoCieloDatos = prediccionDia?.estadoCielo || [];
        //Si tienen descripción lo quiero
    const conDescripción = estadoCieloDatos.filter((item) => (item.descripcion));
        //Las que tienen diferencias de 6 horas
        //Para que sean más cercanas
    const periodosValidos = conDescripción.filter(
        (item)=>{
            const [inicio, fin] = item.periodo.split('-').map(Number);//6-12 -> 6 y 12
            let diferencia = fin-inicio;
            return diferencia===6;
        }
    );
        //Finalmente escojo el conjunto que esté mas cercano a la hora actual
    const descripcionActual = periodosValidos.find(
        (item)=>{
            let periodo = item;
            const [inicio, fin] = item.periodo.split('-').map(Number);//6-12 -> 6 y 12
            if(inicio<=horaMenorDiferencia && fin>=horaMenorDiferencia){
                return periodo;
            }
        }
    );
    
    return(
        <div className="TempSensDescription">
            <div className="tempActSensTerm">
                {/*TempActual + sensTermica*/}
                <p className="temperaturaActual">{tempActualEstimada}</p>
                <p className="sensacionTermica">Sensacion Termica: {sensTermicaEstimada}</p>
            </div>
            <div className="descripcionTiempoImagen">
                {/*Imagen + definicion*/}
                <div className="cajaImagenTiempo">
                    <img className="imagenTiempo" src={`https://www.aemet.es/imagenes/png/estado_cielo/${descripcionActual.value}.png`}/>
                </div>
                <p className="descripcionTiempo">{descripcionActual.descripcion}</p>
            </div>
        </div>
    )
}