import React, { useState } from "react"
import Articulos from "../components/common/Articulos";
import BarraCategorias from "../components/common/BarraCategorias";
import Header from "../components/Layout/Header";
import Layaout from "../components/Layout/layout"

function Home () {
    const [categoria, setCategoria] = useState('')

    function cambiarCategoria (x) {
        setCategoria(x)
    }

    return (
        <>
            <Layaout>
                <Header/>
                <BarraCategorias cambiarCategoria={cambiarCategoria} />
                <Articulos categoria={categoria}/>
            </Layaout>
        </>
    )
}

export default Home;