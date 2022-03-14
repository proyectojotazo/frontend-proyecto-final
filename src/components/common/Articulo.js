import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { getArticulosId } from '../../api/services/articulos'

import Info from './Info'
import Spinner from './Spinner'

import './Articulo.scss'

const parseImgUrl = (url) =>
  `${process.env.REACT_APP_API_BASE_URL}/${url.replace('public\\', '')}`

function Articulo() {
  const [art, setArticulo] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState({
    message: '',
    active: false,
  })
  const { id } = useParams()

  useEffect(() => {
    getArticulosId(id)
      .then(setArticulo)
      .catch((err) => setError({ message: err.message, active: true }))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <Spinner />

  if (error.active) {
    return <div>{error.message}</div>
  }

  return (
    <div className="articulo__container">
      <Info art={art} />

      <div className="articulo__imgPortada">
        <img src={parseImgUrl(art.archivoDestacado)} alt="Imagen titular" />
      </div>

      <h1 className="articulo__titulo">{art.titulo}</h1>
      <h3 className="articulo__textoIntroductorio">{art.textoIntroductorio}</h3>
      <p className="articulo__contenido">{art.contenido}</p>
      {/* TODO: Crear componente con la info del comentario */}
      <div className="articulo__container-comentarios">
        Comentarios:
        {art.comentarios.map((comentario) => (
            <p
              key={comentario.fechaPublicacion}
              className="comentario__texto-comentario"
            >
              {comentario.contenido}
            </p>
          ))}
      </div>
    </div>
  )
}

export default Articulo
