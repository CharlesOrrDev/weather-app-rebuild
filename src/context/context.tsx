"use client"

import { createContext, useContext, useState } from "react";

interface Context
{
    lat: number;
    setLat: (lat: number) => void;

    lon: number;
    setLon: (lon: number) => void;
}

// Creating the context
const AppContext = createContext<Context>(
{
    lat: 0,
    setLat: (lat: number) => 0,

    lon: 0,
    setLon: (lon: number) => 0
});


// Creating the wrapper
export function AppWrapper({children}: {children: React.ReactNode})
{
    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);

    return (
        <AppContext.Provider value={ { lat, setLat, lon, setLon } }>{children}</AppContext.Provider>
    )
}


// Function to allow access to data
export function useAppContext()
{
    return useContext(AppContext);
}