/*Este apartado contiene:
La barra de buscador, donde insertar el municipio que se quiere buscar
-Pone en que municipio estas
-Funciona también con el enter
El botón de buscar
El botón de información
 */

import { useState, useContext, useEffect, useCallback } from "react";
import '../header.css';
import municipios from '../../../assets/src/json/municipios_espana.json';
import { HabilitadoContext } from '../../../context/HabilitadoContext.jsx';
import { useWeather } from '../../../hooks/useWeather.jsx';

export default function Buscador(){
    //Variables
    let [municipioActual, setMunicipioActual] = useState("Madrid");
    const [verPdf, setVerPdf] = useState(false); //Ver el pdf
    const [busqueda, setBusqueda] = useState("Madrid");//Manejar las busquedas 

    //De HabilitadoContext
    let {bDesabilitado} = useContext(HabilitadoContext);
    
    // Extraemos la lógica de la API y avisos desde nuestro custom hook
    const { consultarClima, abortarPeticion, setMensajeInfo } = useWeather();

    // Precalculamos la lista indexando los nombres normalizados una sola vez al cargar el módulo
    const municipiosIndexados = municipios.map((m) => ({
        codigo: m.codigo,
        nombre: m.nombre,
        nombreNormalizado: m.nombre.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    }));

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

    const manejarBusqueda = useCallback(() => {
        //Si no escriben nada
        if (!busqueda.trim()) {//Quita espacio al principio y al final si tiene
            setMensajeInfo({texto: 'Escribe un municipio.', tipo: 'error'});
            return;
        }
        const codigo = buscarCodigoMunicipio(busqueda);
        if (!codigo || codigo === null) {
            setMensajeInfo({ texto: `No se encontró el municipio "${busqueda}".`, tipo: 'error' });
            return;
        }
        //Ahora lo hace por el hookPersonalizado de useWeather
        consultarClima(codigo, busqueda, () => setMunicipioActual(busqueda));
    }, [busqueda, municipiosIndexados, consultarClima, setMensajeInfo]);

    // useEffect que solo se ejecuta una vez al montar el componente
    useEffect(() => {
        manejarBusqueda();

        return () => {
            abortarPeticion();
        };
    }, []);//Solo se ejecuta al iniciar la página, y así está perfecto no hace falta cambiarlo porque no da error y hace lo que quiero

    return (
        <div className = "buscadorMunicipio">
        {/*Buscador y botón buscar*/}
            <input className="inputBusqueda" type="text" placeholder={municipioActual}
                value={busqueda} onChange={(e) => setBusqueda(e.target.value)}
                disabled={bDesabilitado}
            />
            <button className="buscarMunicipio" onClick={manejarBusqueda} disabled={bDesabilitado}>
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