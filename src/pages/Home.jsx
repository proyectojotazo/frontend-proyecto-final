import React, { useState } from 'react';
import Articulos from '../components/common/Articulos';
import BarraCategorias from '../components/common/BarraCategorias';
import Header from '../components/Layout/Header';
import Paginacion from '../components/common/Paginacion';

function Home() {
    const [categoria, setCategoria] = useState('');
    const [orden, setOrden] = useState('-fechaPublicacion');
    const [pagina, setPagina] = useState(0);
    const [hasArticles, setHasArticles] = useState(false);

    const cambiarCategoria = (x) => {
        setCategoria(x);
        setPagina(0);
    };

    const cambiarPaginaSig = () => {
        setPagina(pagina + 6);
    };

    const cambiarPaginaAnt = () => {
        if (pagina === 0) return;
        setPagina(pagina - 6);
    };

    const cambiarOrden = (o) => {
        setOrden(o);
    };

    const handleArticles = (hasArticles) => setHasArticles(hasArticles);

    return (
        <>
            <Header />
            <BarraCategorias cambiarCategoria={cambiarCategoria} />
            {hasArticles && (
                <Paginacion
                    paginaAtras={cambiarPaginaAnt}
                    paginaSig={cambiarPaginaSig}
                    order={cambiarOrden}
                />
            )}
            <Articulos
                categoria={categoria}
                cambiarCategoria={cambiarCategoria}
                ultimaPag={cambiarPaginaAnt}
                orden={orden}
                pagina={pagina}
                handleArticles={handleArticles}
            />
        </>
    );
}

export default Home;
