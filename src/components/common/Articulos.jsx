import React from 'react';
import { useEffect, useState } from 'react';
import { getArticulosCategorias } from '../../api/services/articulos';
import Card from './Card';

import '../common/articulos.scss';
import UserInfo from './UserInfo';

function Articulos(props) {
    const [articulos, setArticulos] = useState([]);
    const { categoria, orden, pagina, cambiarCategoria, ultimaPag, handleArticles } = props;

    useEffect(() => {
        getArticulosCategorias(categoria, orden, pagina).then((x) => {
            if (x.length === 0 && pagina !== 0){
                
                return ultimaPag();  
            } 
            setArticulos(x);
            handleArticles(!!x.length)
        });
    }, [categoria, orden, pagina, ultimaPag, handleArticles]);

    return (
        <section className="seccionArticulos">
            {articulos.length !== 0 ? (
                articulos.map((articulo) => (
                    <div key={articulo._id} className="card__wrapper">
                        <Card
                            articulo={articulo}
                            cambiarCategoria={cambiarCategoria}
                        />
                        <UserInfo user={articulo.usuario[0]} />
                    </div>
                ))
            ) : (
                <p>No hay</p>
            )}
        </section>
    );
}

export default Articulos;
