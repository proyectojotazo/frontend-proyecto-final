import React from "react";
import { useEffect, useState } from 'react'
import { getArticulos, getArticulosCategorias } from "../../api/services/articulos";
import Card from "./Card";
import { Link } from "react-router-dom";
import "../common/articulos.scss"

function Articulos(props) {
    const [articulos, setArticulos] = useState([])
    const {categoria} = props;

    
    useEffect(() => {
        if (categoria)  {
                getArticulosCategorias(categoria).then(x=>{setArticulos(x)})}
            else {
                getArticulos().then(x=>{setArticulos(x)})
            }
            
    }, [categoria])

    return (
        <section className="seccionArticulos">
            {articulos.map(({ id, ...advert }) => (
                <Link to={`/articles/${id}`}>
                    <Card {...advert} />
                </Link>
            ))}   
    
        </section>
        )
    

}

export default Articulos