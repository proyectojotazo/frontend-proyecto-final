import React from "react";
import "./categoria.scss"


function Categoria ({categoria, cambiarCategoria}) {
    

    return (
        <div className="divCategorias">
            {categoria.map((lenguaje)=>(
                <p key={Math.random()} className={`cat ${lenguaje}`} onClick={()=>{cambiarCategoria((lenguaje==='todas') ?'':lenguaje)}}>{lenguaje}</p>
            ))}
        </div>
    )
}

export default Categoria;