//Separado de barraBuscador porque no para de pedirlo el webiArena y así de paso tengo un hookPersonalizado
import { useContext, useRef, useCallback } from "react";
import { fetchWeatherByMunicipio } from '../apartados/API/Aemet.js';
import { ClimaContext } from '../context/ClimaContext.jsx';
import { HabilitadoContext } from '../apartados/header/header.jsx';

//HookPersonalizado
export function useWeather() {
    const { setDatosTiempo, setMensajeInfo } = useContext(ClimaContext);
    let { bloqeuar, desBloqeuar } = useContext(HabilitadoContext);
    
    //controlador de aborto
    const abortControllerRef = useRef(null);

    //Manejar la búsqueda
    //Use Callback para guardar la vaersión hasta que la cambie el user
    const consultarClima = useCallback(async (codigo, busqueda, alExito) => {
        // Cancelamos cualquier petición previa en curso antes de empezar una nueva
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        // Creamos un nuevo controlador para la petición actual
        abortControllerRef.current = new AbortController();

        //Si escriben algo se buscará (mostramos mensaje de cargando)
        setMensajeInfo({ texto: 'Buscando municipio...', tipo: 'cargando' });
        try {
            bloqeuar();//Bloqueamos controles

            //Ejecutamos la búsqueda a la API de Aemet usando la señal guardada en la referencia
            const datos = await fetchWeatherByMunicipio(codigo, abortControllerRef.current.signal);
            
            //Guardamos los datos
            if (setDatosTiempo) setDatosTiempo(datos);
            if (datos != null && alExito) alExito();
            //Limpiar mensaje si todo salió bien
            setMensajeInfo({ texto: '', tipo: '' });
        } catch (error) {
            //Petición cancelada por usuario
            if (error.name === 'AbortError') return;
            //Si falla algo ha sido de la API
            setMensajeInfo({ 
                texto: error.message || 'Error al consultar AEMET.', 
                tipo: 'error' 
            });
        }
        finally{
            desBloqeuar();
        }
    }, [setDatosTiempo, setMensajeInfo, bloqeuar, desBloqeuar]);

    const abortarPeticion = useCallback(() => {
        // Cancelamos la petición activa si el componente se desmonta
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
    }, []);

    return { consultarClima, abortarPeticion, setMensajeInfo };
}