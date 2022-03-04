import '../../sass/contenedor.scss';
import React from "react"
import Header from "./header"
import Footer from "./footer"
import Nav from "./nav"


class Layout extends React.Component {
    render(){
        return (
        <>
            <Nav/>
            <main className='main'>
                <Header/>
                {this.props.children}
            </main>
            <Footer/>
        </>
    )
    }
}export default Layout;