import LazyMap, { LazyMarker } from '@/components/Map.lazy';
import axios from 'axios';
import React from 'react';

export default async function  HomePage() {
  const styles = {
    homePage: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      color: '#333', /* Texto gris oscuro */
    },
    welcomeSection: {
      marginBottom: '20px',
    },
    featuredContent: {
      marginTop: '20px',
    },
    aboutUs: {
      marginTop: '20px',
    },
    contact: {
      marginTop: '20px',
    },
    title: {
      color: '#333',
    },
  };
  const urlBase = process.env.NEXTAUTH_URL;

  const directionResponse = await fetch(`${urlBase}/api/directions`);
  const database = await axios.get('http://localhost:3000/api/directions');
  const datos = database.data;
  return (
    <><div style={styles.homePage}>
      <section style={styles.welcomeSection}>
        <h1 style={styles.title}>Bienvenidos a Eventual</h1>
        <p>
          Eventual es tu página de eventos de confianza.
        </p>
      </section>

      <section style={styles.featuredContent}>
        <h2 style={styles.title}>Eventos destacados</h2>
        <p>
          Descubre nuestras últimos eventos y características destacadas.
        </p>

      </section>
    </div><div>

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
              <img src={item.imagen} style={{ width: '200px', height: '200px' }}></img>
            </li>
          ))}
        </ul>
      </div></>
  );
}

