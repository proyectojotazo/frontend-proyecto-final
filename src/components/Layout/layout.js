import './layout.scss';
import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import Nav from "./Nav"
import BarraCategorias from "../common/BarraCategorias"


function Layout({ children }) {

    return (
        <div className='container'>
            <Nav />
            <main className='main'>
                <Header />
                <BarraCategorias />
                {children}
            </main>
            <Footer />
        </div>
    )
}
export default Layout;