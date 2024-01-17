import LazyMap, { LazyMarker } from '@/components/Map.lazy';
import axios from 'axios';
import React from 'react';
import Image from "next/image"; // Import the Image component from the correct package


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
  const database = await axios.get(`${process.env.NEXTAUTH_URL}/api/directions`);
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
    </div></>
  );
}

