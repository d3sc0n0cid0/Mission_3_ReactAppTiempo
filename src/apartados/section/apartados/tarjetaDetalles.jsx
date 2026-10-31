

export default function TarjetaDetalles({ prediccionDia }) {

  const viento = prediccionDia.viento[0]?.velocidad || 0;
  const direccionViento = prediccionDia.viento[0]?.direccion || '';
  const humedad = prediccionDia.humedadRelativa?.maxima || 0;
  const probPrecipitation = prediccionDia.probPrecipitacion[0]?.value || 0;

  return (
    <div className="otrasInfo">
      <p className="caja">💨 Viento: {viento} km/h {direccionViento}</p>
      <p className="caja">💧 Humedad Máxima: {humedad}%</p>
      <p className="caja">🌧️ Probabilidad de lluvia: {probPrecipitation}%</p>
    </div>
  );
}