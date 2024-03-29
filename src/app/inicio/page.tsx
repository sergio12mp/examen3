/* eslint-disable @next/next/no-async-client-component */

import React, { useEffect } from "react";
import LazyMap, { LazyMarker } from "@/components/Map.lazy";
import { notFound } from "next/navigation";
import { ImageForm } from "@/components/ImageForm";
import { GetDirections } from "@/lib/database";
import { GET } from "../api/directions/route";
import axios from "axios";
import { data } from "autoprefixer";
import Image from "next/image"; // Import the Image component from the correct package
import { signIn, useSession, signOut } from "next-auth/react";



export default async function Inicio() {
    const urlBase = process.env.NEXTAUTH_URL;

    const directionResponse = await fetch(`${urlBase}/api/directions`);
    const database = await axios.get(`${process.env.NEXTAUTH_URL}/api/directions`);
    const datos = database.data;


    const longitud = Number(45.4215);
    const latitud = Number(-75.6994);

    return (
        <div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {datos.map((item: {
                        concepto: string;
                        timestamp: Date;
                        cantidad: number;
                        lat: number;
                        lon: number;
                        email: string;
                        imagen: string;
                    }, index: number) => (
                        <li key={index} style={{ margin: '20px 0', textAlign: 'center', border: '1px solid #ccc', borderRadius: '10px', padding: '20px', width: '80%' }}>
                            <h1 style={{ margin: '10px 0' }}>{item.concepto}</h1>
                            <p style={{ margin: '10px 0' }}>{item.cantidad}</p>
                            <p style={{ margin: '10px 0' }}>{item.email}</p>
                            <p style={{ margin: '10px 0' }}>{item.timestamp.toString()}</p>

                            {/* eslint-disable-next-line jsx-a11y/alt-text, react/jsx-no-undef */}
                            <Image src={item.imagen} alt="" width={200} height={200} />
                            <br></br>
                            <div style={{ height: "300px", width: "200px" }}>
                                <LazyMap center={[item.lat, item.lon]} zoom={15}>
                                    {datos.map((item: {
                                        concepto: string;
                                        timestamp: Date;
                                        cantidad: string;
                                        lat: number;
                                        lon: number;
                                        email: string;
                                        imagen: string;
                                    }, index: number) => (
                                        <LazyMarker key={index} position={[item.lat, item.lon]}></LazyMarker>
                                    ))}
                                </LazyMap>



                            </div>
                            {/* Si usuario.session.email != item.email -> se muestra el boton de pagar y al pulsar lo añade a los pagados*/}
                            <button>Pagar gasto</button> <br></br>
                            {/* Si usuario.session.email = item.email -> se muestra eliminar gasto y lo borra  */}

                            <button>Eliminar gasto</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
function registerLogin(userData: { caducidad: string; email: string | null | undefined; }) {
    throw new Error("Function not implemented.");
}

