import http from "./http";

export async function getWeatherData(lat, lon){
    //https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API_KEY}
    //https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
    const API_KEY = process.env.VUE_APP_WEATHER_API_KEY;
    let initialLat = lat;
    let initialLon = lon;
    return http.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${initialLat}&lon=${initialLon}&appid=${API_KEY}`);
}