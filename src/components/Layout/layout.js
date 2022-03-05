import './layout.scss';
import React from "react"
import Header from "./header"
import Footer from "./footer"
import Nav from "./nav"


function Layout({ children }) {

    return (
        <div className='container'>
            <Nav />
            <main className='main'>
                <Header />
                {children}
            </main>
            <Footer />
        </div>
    )
}
export default Layout;