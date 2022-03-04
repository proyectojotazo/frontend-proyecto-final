import '../../sass/contenedor.scss';
import '../../sass/header.scss';
import React from "react";
import { ReactComponent as Gente } from '../../assets/gente.svg';

class Header extends React.Component {
    render() {
        return(
            <header className="header">
                <div className='imagen'>
                    <Gente/>
                </div>
                <div className='texto'>
                    <h1>Crea, <br/> Escribe <br/> & Comparte</h1>
                    <p>El último me voy.... nace de la necesidad de unos programadores de devolver a internet un poco de lo han cogido.... crea, escribe y comparte, únete a la comunidad. </p>
                </div>
            </header>
        );
    }
}

export default Header;