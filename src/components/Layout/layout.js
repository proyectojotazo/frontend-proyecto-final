import './layout.scss';
import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import Nav from "./Nav"
import BarraCategorias from "../common/BarraCategorias"
import Card from '../common/Card';


function Layout({children}) {
    
        return (
        <div className='container'>
            <Nav/>
            <main className='main'>
                <Header/>
                <BarraCategorias/>
                <Card/>
                {children}
            </main>
            <Footer/>
        </div>
    )
    }
    export default Layout;