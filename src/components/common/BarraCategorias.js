import React from "react";
import "./barraCategorias.scss"
import {categorias} from "../../utils/categorias"

function BarraCategorias ({cambiarCategoria}) {
    

    return(
            <section className="categorias">
                <ul className="ulCategorias">
                {categorias.map((elemento)=>(
                        <div key={elemento.color}>
                        {elemento.categorias.map((lenguaje)=>(
                            <li key={lenguaje} className={elemento.color} onClick={()=>{cambiarCategoria((lenguaje==='todas') ?'':lenguaje)}}>{lenguaje.toLocaleUpperCase()}</li>
                            ))}
                        </div>
                    
                    ))}
                </ul>
            </section>
    );
}

export default BarraCategorias;