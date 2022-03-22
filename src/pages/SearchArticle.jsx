import { React, useState } from 'react';
import './SearchArticle.scss';
import { searchArticle } from '../api/services/articulos';
import Card from '../components/common/Card';
import Articulos from '../components/common/Articulos';
import Nav from '../components/Layout/Nav';

import '../components/common/articulos.scss';

export default function SearchArticle() {

  const [articulos, setarticulos] = useState([]);

  const [search, setSearch] = useState("");

  const submitSearch = (e) => {
    e.preventDefault();
    searchArticle(search).then((data) => {
      setarticulos(data);
    }).catch((error) => {
      console.log(error)
    })
  }

  const handleChange = (e) => {
    setSearch({
      [e.target.name]: e.target.value,
    });
  }

  console.log(search)
  console.log(articulos)
  return (
    <div>
      <form
        onSubmit={submitSearch}
        className="search-bar-form"
      >
        <input
          type="text"
          name="search"
          className="search-bar"
          placeholder="Busca por Artículo..."
          onChange={handleChange}
        />
        <button
          className="btn-search"
        >Buscador</button>
      </form>
      {articulos &&
        articulos.map((articulo) => (
          <tr key={articulo._id}>
            <td>{articulo.titulo}</td>
          </tr>
        ))}
    </div>
  )
}
