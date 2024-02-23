const Weather = ({weather, capital}) => {
    if (Object.keys(weather).length < 1) {
        return (<div></div>)
    }
    const {list:weatherList} = weather
    const actualWeather = weatherList[0]
    const temperature = Math.floor(Number(actualWeather.main.temp) - 273.15)
    console.log(actualWeather);
    console.log(Math.floor(temperature));
    return (<div>
        <h3>Weather in {capital}</h3>
        <p>temperature {temperature} celsius</p>
        <img src={` https://openweathermap.org/img/wn/${actualWeather.weather[0].icon}@2x.png`} alt={actualWeather.weather[0].main} />
        <p>Wind {actualWeather.wind.speed} m/s</p>
    </div>)
}

export default Weather
