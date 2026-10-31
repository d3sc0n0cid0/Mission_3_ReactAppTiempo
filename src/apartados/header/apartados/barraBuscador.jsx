/*Este apartado contiene:
La barra de buscador, donde insertar el municipio que se quiere buscar
-Pone en que municipio estas
-Funciona también con el enter
El botón de buscar
El botón de información
 */

/*
    TO-DO:
    -Bloquear controles mientras se busca
    -Desbloqeuar controles en el finally
*/
import { useState, useContext,useEffect, useMemo } from "react";
import {fetchWeatherByMunicipio} from '../../API/Aemet.js'
import '../header.css';
import municipios from '../../../assets/src/json/municipios_espana.json';
import { ClimaContext } from '../../../App.jsx';
import { HabilitadoContext } from '../header.jsx';


export default function Buscador({onHabilitar}){
    //Variables
    let [municipioActual, setMunicipioActual] = useState("Madrid");
    const [verPdf, setVerPdf] = useState(false); //Ver el pdf
    const [busqueda, setBusqueda] = useState("Madrid");//Manejar las busquedas 
    const { setDatosTiempo, setMensajeInfo } = useContext(ClimaContext);

    //De HabilitadoContext
    let {bDesabilitado,bloqeuar,desBloqeuar} = useContext(HabilitadoContext);

    // Precalculamos la lista indexando los nombres normalizados una sola vez al cargar el módulo
    //lo meto en un useMemo para evitar el coste de tener qe calcularlo cada vez
    const municipiosIndexados = useMemo(() => {
        return municipios.map((m) => ({
            codigo: m.codigo,
            nombre: m.nombre,
            nombreNormalizado: m.nombre.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        }));
    }, [municipios]);//Y solo cambia cuand cambie municipios

    //Funciones
    /*Muestra el pdf*/
    function mostrarPdf(){
        setVerPdf(!verPdf);
    }
    /*Busca el municipio*/
        //Comprobamos si lo tengo en mi lista de municipios
    function buscarCodigoMunicipio(busqueda) {

        if (!busqueda) {return null;}
          const terminoLimpio = busqueda.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          const municipioEncontrado = municipiosIndexados.find(m => 
            m.nombreNormalizado === terminoLimpio
          );
          return municipioEncontrado ? municipioEncontrado.codigo : null;
    }

    //Manejar la búsqueda
    const manejarBusqueda = async () => {
        //Si no escriben nada
        if (!busqueda.trim()) {
            setMensajeInfo({texto: 'Escribe un municipio.', tipo: 'error'});
            return;
        }
        const codigo = buscarCodigoMunicipio(busqueda);
        if (!codigo || codigo === null) {
            setMensajeInfo({ texto: `No se encontró el municipio "${busqueda}".`, tipo: 'error' });
            return;
        }
        //Si escriben algo se buscará (mostramos mensaje de cargando)
        setMensajeInfo({ texto: 'Buscando municipio...', tipo: 'cargando' });
        try {
            bloqeuar();//Bloqueamos controles

            //Ejecutamos la búsqueda a la API de Aemet
            const datos = await fetchWeatherByMunicipio(codigo);
            //Guardamos los datos
            if (setDatosTiempo) setDatosTiempo(datos);
            if(datos!=null) setMunicipioActual(busqueda) 
            //Limpiar mensaje si todo salió bien
            setMensajeInfo({ texto: '', tipo: '' });
        } catch (error) {
            //Si falla algo ha sido de la API
            setMensajeInfo({ 
                texto: error.message || 'Error al consultar AEMET.', 
                tipo: 'error' 
            });
        }
        finally{
            desBloqeuar();
        }
    };

    // useEffect con [] se ejecuta AUTOMÁTICAMENTE NADA MÁS CUALQUIERA ENTRA A LA PÁGINA
    useEffect(() => {
        manejarBusqueda(); 
    }, []); // El array vacío [] asegura que solo se ejecute al cargar el componente

    return (
        <div className = "buscadorMunicipio">
        {/*Buscador y botón buscar*/}
            <input className="inputBusqueda" type="text" placeholder={municipioActual}
                value={busqueda} onChange={(e) => setBusqueda(e.target.value)}
                disabled={bDesabilitado}
            />
            <button className="buscarMunicipio" onClick ={manejarBusqueda} disabled={bDesabilitado}>
                <span>&#128269;</span>
            </button>
        {/*Pdf y botón mostrar/oculatr pdf*/}
            <button className="botonInformacion" onClick={mostrarPdf}>(&#8505;)</button>
            {/*Es lo más cercano a tener un toggle class, si es visible le añade el .mostrar */}
            <div className={`pdf-container ${verPdf ? 'mostrar' : ''}`}>
                <iframe 
                src="/assets/src/pdf/detalle_municipios_zonas_meteorologicas.pdf"
                title="Detalle municipios"
                ></iframe>
            </div>
        </div>
    )
}