import React, { useState } from "react"
import Articulos from "../components/common/Articulos";
import BarraCategorias from "../components/common/BarraCategorias";
import Header from "../components/Layout/Header";
import Layout from "../components/Layout/Layout"

function Home () {
    const [categoria, setCategoria] = useState('')

    function cambiarCategoria (x) {
        setCategoria(x)
    }

    return (
        <>
            <Layout>
                <Header/>
                <BarraCategorias cambiarCategoria={cambiarCategoria} />
                <Articulos categoria={categoria}/>
            </Layout>
        </>
    )
}

export default Home;