import { React, useState, useEffect } from 'react';
import './SearchArticle.scss';
import { searchArticle } from '../api/services/articulos';
import Card from '../components/common/Card';
import Articulos from '../components/common/Articulos';
import Nav from '../components/Layout/Nav';

import '../components/common/articulos.scss';

export default function SearchArticle() {
    //articulos estaticos
    const [articulos, setarticulos] = useState([]);

    const [search, setSearch] = useState('');

    const [showArticles, setshowArticles] = useState([]);

    const submitSearch = (e) => {
        e.preventDefault();
        searchArticle(search)
            .then((data) => {
                setarticulos(data);
                setshowArticles(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleChange = (e) => {
        setSearch(e.target.name);
        filter(e.target.value);
    };

    const filter = (terminoBusqueda) => {
        let resultadoBusqueda = articulos.filter((elemento) => {
            if (
                elemento.contenido
                    .toString()
                    .toLowerCase()
                    .includes(terminoBusqueda.toLowerCase()) ||
                elemento.titulo
                    .toString()
                    .toLowerCase()
                    .includes(terminoBusqueda.toLowerCase())
            ) {
                return elemento;
            }
        });
        setshowArticles(resultadoBusqueda);
    };

    console.log(filter);
    console.log(search);
    console.log(showArticles);

    return (
        <div>
            <form onSubmit={submitSearch}>
                <input
                    type="text"
                    name="search"
                    className="search-bar"
                    placeholder="Busca por Artículo..."
                    onChange={handleChange}
                />
            </form>
            {articulos &&
                showArticles.map((articulo) => (
                    <tr key={articulo._id}>
                        <td>{articulo.titulo}</td>
                    </tr>
                ))}
        </div>
    );
}
