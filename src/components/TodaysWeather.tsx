"use client"

import { useAppContext } from '@/context/context'
import { WeatherForecast } from '@/interfaces/interfaces'
import { getWeatherData } from '@/services/services'
import React, { useEffect, useState } from 'react'

const TodaysWeather = (props: {todaysDay: string, slicedMonth: string, dayNumber: string, year: string}) =>
{
  const {lat, lon} = useAppContext();

  const [weathData, setWeathData] = useState<WeatherForecast>();
  const [lowTemp, setLowTemp] = useState<number>();
  const [highTemp, setHighTemp] = useState<number>();
  const [forecast, setForecast] = useState<string>();

  const getData = async () =>
  {
    setWeathData(await getWeatherData(lat, lon, 5));
    console.log(weathData);
    setLowTemp(weathData?.list[0].main.temp_min);
    setHighTemp(weathData?.list[0].main.temp_max);
    setForecast(weathData?.list[0].weather[0].main);
  }

  useEffect(() =>
  {
    getData();
  },[lat, lon])

  return (
    <div className="
        w-[725px] h-[650px]
        bg-black/50
        border-white
        border
        rounded-[10px]
        text-white
        p-0
        flex flex-col justify-center
        shadow-[0_0_15px_rgba(0,0,0,1)]
        mr-[50px]
      ">
      <div className="flex flex-col justify-top h-[100%]">

        <div className="opacity-[75%] text-[36px] ml-[50px] pb-[110px] pt-[50px]">
          <p>Todays Forecast</p>
        </div>

        <div>

          <div className="text-[36px] flex justify-center">
            <p>{props.todaysDay}</p>
          </div>

          <div className="text-[40px] flex justify-center pt-[10px]">
            <p>{props.slicedMonth} {props.dayNumber} {props.year}</p>
          </div>

          <div className="flex justify-center pt-[15px]">
            <div>
              <img className="w-[80px] h-[80px] flex items-center" src={`/assets/${forecast}.png`} alt={forecast} />
            </div>

            <div className="text-[40px] ml-[25px] flex items-center">
              <p>{forecast}</p>
            </div>
          </div>

          <div className="flex justify-center font-bold">
            <div className="text-[32px] flex items-end opacity-[50%] mb-[5.3px]">
              <p>{lowTemp} °F</p>
            </div>

            <div className="text-[48px] flex items-end ml-[5px]">
              <p>{highTemp} °F</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default TodaysWeather