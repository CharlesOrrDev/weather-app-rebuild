"use client"

import { useAppContext } from '@/context/context';
import { getLocData, getWeatherData } from '@/services/services'
import React, { useEffect, useState } from 'react'

const SearchBar = () =>
{
  const [search, setSearch] = useState("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  const {lat, setLat, lon, setLon} = useAppContext();

  useEffect(() =>
  {
    setCity(search.split(",")[0]);
    setState(search.split(",")[1]);
    setCountry(search.split(",")[2]);
  },[search])

  let weathData = {};

  const getData = async () =>
  {
    const data = await getLocData(city, state, country, 5);

    setLat( data[0].lat );
    setLon( data[0].lon );

    console.log( lat, lon )

    weathData = await getWeatherData(lat, lon, 5);
  }

  useEffect(() =>
  {
    getData();
  },[city, state, country])

  useEffect(() =>
  {
    setCity("Stockton");
    setState("CA");
    setCountry("US");
  },[])

  return (
    <div className="
        w-[632px] h-[42px]
        bg-[#7B7B7B]
        rounded-[10px]
        border-white
        border
        flex
        shadow-[0_0_15px_rgba(0,0,0,1)]
      ">
        <div>
          <img src="/assets/search.png" alt="search icon" />
        </div>

        <div className="w-[100%] flex justify-evenly">
          <input
            className="
              w-[100%]
              cursor-pointer
              text-center
              focus:outline-none
              text-[20px]
              text-black/70
              font-bold
              placeholder:text-black/70
              placeholder:text-[20px]
              placeholder:font-bold
              focus:placeholder:text-transparent
            "
            type="text"
            placeholder="Search Here"
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
    </div>
  )
}

export default SearchBar