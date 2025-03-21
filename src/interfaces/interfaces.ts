export interface WeatherForecast
{
    list: {
        main: {
            temp_min: number
            temp_max: number
        }
        weather: {
            main: string
        }[]
    }[]
}