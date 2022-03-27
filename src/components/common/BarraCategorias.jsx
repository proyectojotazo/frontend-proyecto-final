import React from "react";
import "./barraCategorias.scss"
import {categorias} from "../../utils/categorias"
import { useAuth } from "../../contexts/authContext";

function BarraCategorias ({cambiarCategoria}) {
    const {t} = useAuth();
    const categoriaTodas = t("main.barraCategorias.all")

    return(
        <div className="hr">
            <section className="categorias">
                <ul className="ulCategorias">
                {categorias.map((elemento)=>(
                        <div className="ulCategorias divCat" key={elemento.color}>
                        {elemento.categorias.map((lenguaje)=>(
                            <li key={lenguaje} className={elemento.color} onClick={()=>{cambiarCategoria((lenguaje==='todas') ?'':lenguaje)}}>{(lenguaje==='todas') ?categoriaTodas.toLocaleUpperCase() : lenguaje.toLocaleUpperCase() }</li>
                            ))}
                        </div>
                    ))}
                </ul>
            </section>
        </div>
    );
}

export default BarraCategorias;