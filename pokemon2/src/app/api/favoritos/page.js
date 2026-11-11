"use client"; 
import { useEffect, useState } from "react"; 
import Link from "next/link"; 
export default function Favoritos() { 
    const [lista, setLista] = useState([]); 
    useEffect(() => {
        fetch("/api/favoritos").then(r => r.json()).then(setLista); 
    }, []); 
    return ( 
        <main style={{padding: 20 }}> 
        <Link href="/">← Voltar</Link> 
        <h1>Pokédex ({lista.length})</h1> 
        <div style={{display: "flex", gap: 10, flexWrap: "wrap" }}> {
        lista.map(p => ( <div key={p.id} style={{border:"1px solid #ccc", padding: 10, textAlign:"center" }}> 
        <img src={p.image} width={80} />
        <p>{p.name}</p> 
        </div> ))} </div> 
        </main> 
    ); 
}