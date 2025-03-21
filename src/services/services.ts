const APIkey = process.env.APIkey;

export const getLocData = async (cityName: string, stateCode: string, countryCode: string, limit: number) =>
{
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=${limit}&appid=${APIkey}`);
    const data = await response.json();

    return data;
}


export const getWeatherData = async (lat: number, lon: number, cnt: number) =>
{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=${cnt}&appid=${APIkey}&units=imperial`);
    const data = await response.json();
    
    return data;
}