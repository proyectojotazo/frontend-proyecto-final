import { React, useState } from 'react';
import './SearchArticle.scss';
import '../components/common/articulos.scss';
import ArticulosFound from '../components/common/ArticulosFound';
import BarraCategorias from '../components/common/BarraCategorias';
import Paginacion from '../components/common/Paginacion';
import { BiSearchAlt } from 'react-icons/bi';

export default function SearchArticle() {
    const [search, setSearch] = useState('');
    const [send, setSend] = useState(false);
    const [categoria, setCategoria] = useState('');
    const [orden, setOrden] = useState('-fechaPublicacion');
    const [pagina, setPagina] = useState(0);

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

    return (
        <div>
            <form onSubmit={submitSearch} className="searchBox">
                <input
                    type="text"
                    name="search"
                    // className="search-bar"
                    placeholder="Busca por Artículo..."
                    onChange={handleChange}
                />

                <button className="btn-search">
                    <BiSearchAlt className="icon-search"></BiSearchAlt>
                </button>
            </form>
            <BarraCategorias cambiarCategoria={cambiarCategoria} />
            <Paginacion
                paginaAtras={cambiarPaginaAnt}
                paginaSig={cambiarPaginaSig}
                order={cambiarOrden}
            />
            {send && (
                <ArticulosFound
                    search={search}
                    categoria={categoria}
                    cambiarCategoria={cambiarCategoria}
                    orden={orden}
                    pagina={pagina}
                />
            )}
        </div>
    );
}
