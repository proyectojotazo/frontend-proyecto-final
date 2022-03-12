import React, { useEffect, useState } from "react";
import "./categoria.scss"


function Categoria ({categoria}) {
    // const [color, setColor] = useState('')

    // const encuentraColor = (categoria) => {
    //     const cat = categoria.split('')
    //     console.log(cat)
    // }

    

    // useEffect(() => {
    //     const col = encuentraColor(categoria)
    //     console.log(categoria)
    //     setColor(encuentraColor(categoria))
    // }, [color]);

    return (
        <div>
            <p className="cat">{categoria}</p>
        </div>
    )
}

export default Categoria;