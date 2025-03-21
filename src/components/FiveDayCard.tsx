"use client"

import React, { useEffect, useState } from 'react'
import { Card } from './ui/card'
import { useAppContext } from '@/context/context';
import { WeatherForecast } from '@/interfaces/interfaces';
import { getWeatherData } from '@/services/services';

const FiveDayCard = (props: {day: string, days: string[], months: string[], date: Date, index: number}) =>
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
    setLowTemp(weathData?.list[props.index].main.temp_min);
    setHighTemp(weathData?.list[props.index].main.temp_max);
    setForecast(weathData?.list[props.index].weather[0].main);
  }
  
  useEffect(() =>
  {
    getData();
  },[lat, lon])

  const [currentDate, setCurrentDate] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");

  const isToday: boolean = day == props.day;

  useEffect(() =>
  {
    setCurrentDate( props.date.toString() );

    let slicedDay = currentDate.slice( 0,3 );
    let slicedMonth = currentDate.slice( 4,7 );

    props.days.forEach(day =>
    {
        if ( day.includes( slicedDay ) )
        {
            setDay( day );
        }
    });

    props.months.forEach(month =>
    {
        if ( month.includes( slicedMonth ) )
        {
            setMonth( month );
        }
    });
  },[currentDate])

  return (
    <>
      <Card className={`
        w-[250px] h-[220px]
        bg-black/50
        ${ isToday ? "border-white" : "border-white/50" }
        border
        rounded-[10px]
        text-white
        p-0
        flex flex-col justify-center
        shadow-[0_0_15px_rgba(0,0,0,1)]
      `}>

        <div className="text-[32px] flex justify-center">
          <p>{props.day}</p>
        </div>

        <div className="flex justify-center h-[40px]">
          <div className="flex items-center">
            <img
              className="w-[60px] h-[60px] flex items-center"
              src={`/assets/${forecast}.png`}
              alt={forecast}
            />
          </div>

          <div className="text-[20px] flex items-center ml-[20px]">
            <p>{forecast}</p>
          </div>
        </div>

        <div className="flex justify-center font-bold">
          <div className="text-[24px] flex items-end opacity-[50%] mb-[2.3px]">
            <p>{lowTemp} °F</p>
          </div>

          <div className="text-[32px] flex items-end ml-[5px]">
            <p>{highTemp} °F</p>
          </div>
        </div>

      </Card>
    </>
  )
}

export default FiveDayCard