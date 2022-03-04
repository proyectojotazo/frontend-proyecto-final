import '../../sass/contenedor.scss';
import '../../sass/header.scss';
import React from "react";

class Header extends React.Component {
    render() {
        return(
            <header className="header">
                <div className='imagen'></div>
                <div className='texto'></div>
            </header>
        );
    }
}

export default Header;