import React from "react";
import "./barraCategorias.scss"

function BarraCategorias () {
    return(
        <section className="categorias">
            <hr/>
            <ul>
                <li className="todas">TODAS</li>
                <li className="frontend">HTML</li>
                <li className="frontend">CSS</li>
                <li className="frontend">JAVASCRIPT</li>
                <li className="frontendF">ANGULAR</li>
                <li className="frontendF">VUE</li>
                <li className="frontendF">REACT</li>
                <li className="backend">PHP</li>
                <li className="backend">PYTHON</li>
                <li className="backend">JAVA</li>
                <li className="backendF">NODE</li>
                <li className="backendF">LARAVEL</li>
                <li className="DB">MYSQL</li>
                <li className="DB">MONGODB</li>
            </ul>
            <hr/>
        </section>
    );
}

export default BarraCategorias;