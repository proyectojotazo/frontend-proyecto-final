import React from 'react';
import './SearchArticle.scss';


export default function SearchArticle() {
  return (
    <div>
      <input
        type="text"
        className="search-bar"
        placeholder="Busca por Artículo..."
      />
    </div>
  )
}
