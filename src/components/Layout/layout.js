import './layout.scss';
import React from "react"
import Header from "./header"
import Footer from "./footer"
import Nav from "./nav"
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