/* eslint-disable @next/next/no-async-client-component */

import React from "react";
import LazyMap, { LazyMarker } from "@/components/Map.lazy";
import { notFound } from "next/navigation";
import { ImageForm } from "@/components/ImageForm";
import { GetDirections } from "@/lib/database";
import { GET } from "../api/directions/route";
import axios from "axios";
import { data } from "autoprefixer";
import Image from "next/image"; // Import the Image component from the correct package


export default async function Inicio() {
    const urlBase = process.env.NEXTAUTH_URL;

    let data;
    const database = await axios.get('http://localhost:3000/api/directions');
    if(database.status !== 200){
        const directionResponse = await fetch(`${urlBase}/api/directions`);
        data = directionResponse.json();
    }else{
        data = database.data;
    }
    const datos = data;
    
    //console.log(datos[2]);



    // if (directionResponse.status !== 200) {
    //     return <h1>Direction not found</h1>;
    // }
    // const direction = await directionResponse.json();

    // const mapResponse = await fetch(`${urlBase}api/map/direction/${direction._id}`);
    // if (mapResponse.status !== 200) {
    //     return <h1>Map not found</h1>;
    // }
    // const map = await mapResponse.json();

    // const direcciones = await Get("directions");


    const longitud = Number(45.4215);
    const latitud = Number(-75.6994);

    return (
        <div>
            <h1>InicioPage</h1>
            <ImageForm></ImageForm>

            <p>Aqui tienes la dirección:</p>

            <div style={{ height: "500px" }}>
                <LazyMap center={[datos[0].lat, datos[0].lon]} zoom={15}>
                    {datos.map((item: {
                        nombre: string;
                        timestamp: Date;
                        lugar: string;
                        lat: number;
                        lon: number;
                        organizador: string;
                        imagen: string;
                    }, index: number) => (
                        <LazyMarker key={index} position={[item.lat, item.lon]}></LazyMarker>
                    ))}
                </LazyMap>
            </div>
            <ul>
                {datos.map((item: {
                    nombre: string;
                    timestamp: Date;
                    lugar: string;
                    lat: number;
                    lon: number;
                    organizador: string;
                    imagen: string;
                }, index: number) => (
                    <li key={index}>
                        <h1>{item.nombre}</h1>
                        <p>{item.lugar}</p>
                        <p>{item.organizador}</p>
                        <p>{item.timestamp.toString()}</p>

                        {/* eslint-disable-next-line jsx-a11y/alt-text, react/jsx-no-undef */}
                        <Image src={item.imagen} alt="" width={200} height={200} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
