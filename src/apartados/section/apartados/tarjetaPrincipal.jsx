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

    return(
        <div>
            <div>
                {/*TempActual + sensTermica*/}
                <p>{tempActualEstimada}</p>
                <p>{sensTermicaEstimada}</p>
            </div>
            <div>
                {/*Imagen + definicion*/}
            </div>
        </div>
    )
}