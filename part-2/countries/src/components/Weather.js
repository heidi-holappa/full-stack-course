import axios from "axios"
import { useState, useEffect } from "react"

function FetchWeather(setWeather, capital) {
    const api_key = process.env.REACT_APP_API_KEY
    useEffect(() => {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${capital}&units=metric&appid=${api_key}`
        axios
            .get(weatherUrl)
            .then(response => {
                setWeather(response.data)
            })
    }, [])

}

const Weather = ({ capital }) => {
    const [weather, setWeather] = useState([])
    FetchWeather(setWeather, capital)

    if (weather.length != 0) {
        return (
            <div>
                <h2>Weather in {capital}</h2>
                <p>temperature {weather.list[0].main.temp} Celcius</p>
                <img src={`http://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`} />
                <p>wind {weather.list[0].wind.speed} m/s</p>
            </div>
        )
    } else {
        return (
            <div>Fetching weather information, one moment.</div>
        )
    }
    
}

export default Weather