import React, { useState } from 'react'

const WeatherForm = ({onChangeCity}) => {

    const [city, setCity] = useState('')

    function onChange(e){ /* cada vez que ejecuto onchange actualizo mi estado de city */
        const value = e.target.value; //e es objeto que represetna el evento, y uno de sus atributos es el target, que viene a ser el elemento que recibió el evento. (En este caso el botón).

    if(value !== ''){ //si value es diferente de un string vacio que cambie el valor

        setCity(value);
    }
    }

    function handleSubmit(e){ /* e de element */
    e.preventDefault(); //cuando le de enter a nuestro input llamo a un prop como funcion

    onChangeCity(city)
    }


  return (
    <form onSubmit={handleSubmit} className='container'>
        <input type='text' onChange={onChange} className='input'/>{/* cada vez que ejecuto onchange actualizo mi estado de city */}
    </form>
  )
}

export default WeatherForm