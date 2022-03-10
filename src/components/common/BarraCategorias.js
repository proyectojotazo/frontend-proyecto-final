import React from "react";
import "./barraCategorias.scss"


function BarraCategorias ({cambiarCategoria}) {
    const categorias= [
        {color:"rojo", categorias:["todas"]},
        {color:"cyan", categorias:["html", "css", "angular"]},
        {color:"pink", categorias:["angular", "vue", "react"]},
        {color:"orange", categorias:["php", "python", "java"]},
        {color:"purple", categorias:["node", "laravel"]},
        {color:"green", categorias:["mysql", "mongodb"]},
    ];
    const colores = [
        {color: 'rojo', categoria:["html", "css", "angular"]},
        {color: 'verde', categoria:["html", "css", "angular"]}
    ]

    return(
        <section className="categorias">
            <hr/>
            <ul className="ulCategorias">
                <li className="rojo" onClick={()=>{cambiarCategoria('')}}>TODAS</li>
                <li className="cyan" onClick={()=>{cambiarCategoria('html')}}>HTML</li>
                <li className="cyan" onClick={()=>{cambiarCategoria('css')}}>CSS</li>
                <li className="cyan" onClick={()=>{cambiarCategoria('javascript')}}>JAVASCRIPT</li>
                <li className="pink" onClick={()=>{cambiarCategoria('angular')}}>ANGULAR</li>
                <li className="pink" onClick={()=>{cambiarCategoria('vue')}}>VUE</li>
                <li className="pink" onClick={()=>{cambiarCategoria('react')}}>REACT</li>
                <li className="orange" onClick={()=>{cambiarCategoria('php')}}>PHP</li>
                <li className="orange" onClick={()=>{cambiarCategoria('python')}}>PYTHON</li>
                <li className="orange" onClick={()=>{cambiarCategoria('java')}}>JAVA</li>
                <li className="purple" onClick={()=>{cambiarCategoria('node')}}>NODE</li>
                <li className="purple" onClick={()=>{cambiarCategoria('laravel')}}>LARAVEL</li>
                <li className="green" onClick={()=>{cambiarCategoria('mysql')}}>MYSQL</li>
                <li className="green" onClick={()=>{cambiarCategoria('mongodb')}}>MONGODB</li>
            </ul>
            <ul className="ulCategorias">
                {categorias.map((elemento)=>(
                    <div>
                        <h1>{elemento.color}</h1>
                        {elemento.categorias.map((x)=>(<h2>{x}</h2>))}
                    </div>
                    ))}
            </ul>
            <hr/>
        </section>
    );
}

export default BarraCategorias;