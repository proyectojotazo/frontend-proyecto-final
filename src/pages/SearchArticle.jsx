import { React, useState } from 'react';
import { Helmet } from 'react-helmet';
import ArticulosFound from '../components/common/ArticulosFound';
import BarraCategorias from '../components/common/BarraCategorias';
import Paginacion from '../components/common/Paginacion';

import { BiSearchAlt } from 'react-icons/bi';
import './SearchArticle.scss';
import '../components/common/articulos.scss';

function SearchArticle() {
    const [search, setSearch] = useState([]);
    const [send, setSend] = useState(false);
    const [categoria, setCategoria] = useState('');
    const [orden, setOrden] = useState('-fechaPublicacion');
    const [pagina, setPagina] = useState(0);
    const [handleSearch, setHandleSearch] = useState(false);

    const handleChange = (e) => {
        setSearch({
            [e.target.name]: e.target.value,
        });
        setSend(false);
    };
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

    const submitSearch = (e) => {
        e.preventDefault();
        setSend(true);
    };

    const hasSearch = (handleSearch) => setHandleSearch(handleSearch);

    return (
        <>
            <Helmet>
                <title>Search | El Último & Me Voy</title>
                <meta
                    name="description"
                    content="Blog sobre Desarrollo Web creado como proyecto final del Bootcamp Full Stack Web Developer de KeepCoding"
                />
            </Helmet>
            <div>
                <form onSubmit={submitSearch} className="searchBox">
                    <input
                        type="text"
                        name="search"
                        placeholder="Busca por Artículo..."
                        onChange={handleChange}
                    />
                    <button className="btn-search">
                        <BiSearchAlt className="icon-search"></BiSearchAlt>
                    </button>
                </form>
                {handleSearch && (
                    <>
                        <BarraCategorias cambiarCategoria={cambiarCategoria} />
                        <Paginacion
                            paginaAtras={cambiarPaginaAnt}
                            paginaSig={cambiarPaginaSig}
                            order={cambiarOrden}
                        />
                    </>
                )}
                {send && (
                    <ArticulosFound
                        search={search}
                        categoria={categoria}
                        cambiarCategoria={cambiarCategoria}
                        ultimaPag={cambiarPaginaAnt}
                        orden={orden}
                        pagina={pagina}
                        hasSearch={hasSearch}
                    />
                )}
            </div>
        </>
    );
}

export default SearchArticle;
