import { React, useState } from 'react';
import './SearchArticle.scss';
import { searchArticle } from '../api/services/articulos';



export default function SearchArticle() {
  const [search, setSearch] = useState("");
  const [showArticles, setshowArticles] = useState([]);

  const submitSearch = (e) => {
    e.preventDefault();
    searchArticle(search).then((data) => {
      setshowArticles(data)
    }).catch((error) => {
      console.log(error)
    })
  }

  const handleChange = (e) => {
    setSearch({
      [e.target.name]: e.target.value
    })
  }


  console.log(search)
  console.log(showArticles)
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

    </div>
  )
}
