import LazyMap, { LazyMarker } from '@/components/Map.lazy';
import axios from 'axios';
import React from 'react';
import Image from "next/image"; // Import the Image component from the correct package


export default async function HomePage() {
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
        <h1 style={styles.title}>Bienvenidos a aPachasWeb</h1>
        <p>
          aPachasWeb es tu página de para dividir cuentas de confianza.
        </p>
      </section>

      <section style={styles.featuredContent}>
        <h2 style={styles.title}>Funcionalidades</h2>
        <ul>
          <li>En la sección de Inicio puede ver los distintos gastos que habeis hecho tu y tus amigos.</li>
          <li>En la seccion de NuevoGasto puede añadir un nuevo gasto para dividirlo entre todo su grupo de amigos.</li>
          <li>Con Logout puede cerrar su sesion.</li>
        </ul>

      </section>
    </div></>
  );
}

