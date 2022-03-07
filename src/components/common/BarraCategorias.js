import React from "react";
import "./barraCategorias.scss"

function BarraCategorias (props) {
    const {cambiarCategoria} = props;

    return(
        <section className="categorias">
            <hr/>
            <ul className="ulCategorias">
                <li className="todas" onClick={()=>{cambiarCategoria('')}}>TODAS</li>
                <li className="frontend" onClick={()=>{cambiarCategoria('html')}}>HTML</li>
                <li className="frontend" onClick={()=>{cambiarCategoria('css')}}>CSS</li>
                <li className="frontend" onClick={()=>{cambiarCategoria('javascript')}}>JAVASCRIPT</li>
                <li className="frontendF" onClick={()=>{cambiarCategoria('angular')}}>ANGULAR</li>
                <li className="frontendF" onClick={()=>{cambiarCategoria('vue')}}>VUE</li>
                <li className="frontendF" onClick={()=>{cambiarCategoria('react')}}>REACT</li>
                <li className="backend" onClick={()=>{cambiarCategoria('php')}}>PHP</li>
                <li className="backend" onClick={()=>{cambiarCategoria('python')}}>PYTHON</li>
                <li className="backend" onClick={()=>{cambiarCategoria('java')}}>JAVA</li>
                <li className="backendF" onClick={()=>{cambiarCategoria('node')}}>NODE</li>
                <li className="backendF" onClick={()=>{cambiarCategoria('laravel')}}>LARAVEL</li>
                <li className="DB" onClick={()=>{cambiarCategoria('mysql')}}>MYSQL</li>
                <li className="DB" onClick={()=>{cambiarCategoria('mongodb')}}>MONGODB</li>
            </ul>
            <hr/>
        </section>
    );
}

export default BarraCategorias;