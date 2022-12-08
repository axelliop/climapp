import React, { useEffect, useState } from 'react'
import Loading from './Loading'
import WeatherForm from './WeatherForm'

const WeatherApp = () => {

    const [weather, setWeather] = useState(null) /* originalmente nulo porque weather el obj respuesta que obtenemos, si al inicio no hay nada, no hay nada que obtener o guardar */


    useEffect(() => { // cuando usamos esto? varios casos, 1 ejecutar codigo cuando carga la aplicacion, 2 cada vez que existe un renderizado de todo el estado, 3 cuando el componente se destruye

        loadInfo(); // por defecto se carga el loadinfo, que seria london, esto me sirvio para cargar la informacion cuando se cargo el componente

    }, []) //arreglo de dependencias, cada vez que sucede un render, aca coloco ciertas actividades o variables por ejemplo, si dejo el arreglo vacio, el useefect se ejecuta 1 sola vez cuando se crea nuestro componente
    


    useEffect(() => {
        document.title = `Weather | ${weather?.location.name ?? ''}` ; //string weather, y saco la informacion del nombre de la locacion, si me da nulo regresa un string vacio, si da true, el nombre de lo que coloque.
    }, [weather]) // quiero que solamente se ejecute cada vez que cambie el cvalor de weather, cada vez que se cambie quiero que se me cambie el titulo de la pestaña 


/* --------------------- HAGO LA PETICION ---------------------------- */

   async function loadInfo(city = 'london'){ //si no especifico nada en loadinfo, solo me toma london, TAMBIEN HAGO UNA PETICION ASYNCRONA
//especifico con try catch
        try {
            const request = await fetch(`http://api.weatherapi.com/v1/current.json?key=42680023ab0b43408d120620220212&q=${city}`); 
            
            //LLAMO A MIS VARIABLES DE ENTORNO, LAS QUE ESTAN EN .env, con esto adjunto todo el tema de la clave, primero imprimo la url, luego con una key llamo a la app key, y la q, que seria basicamente el link me lleva a la ciudad que yo coloque.

            const json = await request.json(); //transformo la info en json

            setTimeout(() => {
                setWeather(json)
            }, 2000)

            setWeather(json); // aca va la peticion

            console.log(json)

        } catch(error){

        }
    }


/* --------------------- HAGO LA PETICION ---------------------------- */




    function handleChangeCity(city){
        setWeather(null) //cuando cambie de ciudad, guardo un setweather, regreso el valor a nulo para borrar la info, despues llamo a loadInfo
        loadInfo(city)
    }


  return (
    <div className='weatherContainer'>
        <WeatherForm onChangeCity={handleChangeCity}/>
        {weather ? '' : <Loading/>} {/* si weather existe me muestra TODO lo que se ve debajo, en caso de que sea nulo o no exista, llamo a Loading */}
        <div className='mainInfo'>
        <div className='city'>{weather?.location.name}</div>  {/* ciudad */}
        <div className='country'>{weather?.location.country}</div> {/* pais */}
        <div>
            <div className='row'>
            <img src={`http:${weather?.current.condition.icon}`} width='128' alt={weather?.current.condition.text}/> {/* icono, imagen */}
            </div>
            <div className='weatherConditions'>
            <div className='condition' >
                {weather?.current.condition.text}
            </div>
            <div className='current'>
                {weather?.current.temp_c} Grados Celcius
            </div>
            </div>
        </div>
    </div>
    <iframe 
    title='mapa'
    width="600" 
    height="450" 
    style={{border:0}}
     loading="lazy" 
    ></iframe>
    </div>
  )
}

export default WeatherApp