"use client";

import { useSession } from "next-auth/react";
import React, { ChangeEvent, FormEvent, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function NuevoGastoFormulario() {
    const [name, setName] = useState("");
    const [date, SetDate] = useState(new Date());
    const [cantidad, setCantidad] = useState("");
    const [lat, setLat] = useState("");
    const [lon, setLon] = useState("");
    //const [postalCode, setPostalCode] = useState("");
    
    const [file, setFile] = useState<File | null>(null);
    const [uploadMessage, setUploadMessage] = useState<string | null>(null);

    const session = useSession();

    const OnNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newName = event.target.value;

        setName(newName);
    }

    const OnDateChange = (date: Date | null) => {
        if(date) {
            SetDate(date);
        }
    }
    
    const OnValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newCantidad = event.target.value;

        setCantidad(newCantidad);
    }

    const OnLatChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newLat = event.target.value;

        setLat(newLat);
    }

    const OnLonChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newLon = event.target.value;

        setLon(newLon);
    }


   
   
    const OnFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files && event.target.files[0];

        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const HandleSubmit = async (event: FormEvent) => {
        console.log("HandleSubmit");
        event.preventDefault();

        if (!file) {
            setUploadMessage("Please choose a file");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        let imageUrl;

        try {
            const response = await fetch("/api/images", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                imageUrl = data.imageUrl;
            } else {
                const errorData = await response.json();
                setUploadMessage(`Error uploading image: ${errorData.msg}`);
                return;
            }
        } catch (error) {
            setUploadMessage(`Error uploading image.`);
            return;
        }

        //const response = await fetch(`/api/map/fromPostalCode/${postalCode}`);
        //const osmAddress = await response.json();

        const eventData = {
            concepto: name,
            timestamp: date,
            cantidad: cantidad,
            lat: lat,
            lon: lon,
            email: session.data?.user?.email,
            imagen: imageUrl
        }

        const postResponse = await fetch(`/api/directions`, { method: "POST", body: JSON.stringify(eventData)});

        if(postResponse.ok) {
            const responseBody = await postResponse.json();
            window.location.href = `inicio`
        }
    }

    return <>
        <form onSubmit={HandleSubmit}>
            <label htmlFor="Name">Concepto del gasto:</label>
            <input style={{backgroundColor:"BlanchedAlmond", marginBottom:"1%"}} name="Name" type="text" onChange={OnNameChange}></input>
            
            <br></br>

            <label htmlFor="date">Fecha: </label>
            <DatePicker
                name="date"
                selected={date}
                onChange={OnDateChange}
                showTimeSelect
                timeIntervals={15}
                timeFormat="HH:mm"
                dateFormat="yyyy-MM-dd h:mm aa"
            />
            
            <br></br>
            
            <label htmlFor="cantidad">Cantidad: </label>
            <input style={{backgroundColor:"BlanchedAlmond", marginBottom:"1%"}} onChange={OnValueChange} type="text" name="cantidad"></input>

            <br></br>

            <label htmlFor="lat">Latitud: </label>
            <input style={{backgroundColor:"BlanchedAlmond", marginBottom:"1%"}} onChange={OnLatChange} type="text" name="lat"></input>
            
            <br></br>

            <label htmlFor="lon">Longitud: </label>
            <input style={{backgroundColor:"BlanchedAlmond", marginBottom:"1%"}} onChange={OnLonChange} type="text" name="lon"></input>

            <br></br>

            
            <br></br>

            <input style={{marginTop:"1%"}} type="file" onChange={OnFileChange} />
            <button className="bg-sky-400 px-3 py-2 rounded" type="submit">Subir imagen</button>

            <br></br>

            {uploadMessage && <p>{uploadMessage}</p>}

            <br></br>

            <button className="bg-sky-400 px-3 py-2 rounded" type="submit">Crear gasto</button>
        </form>
    </>
}