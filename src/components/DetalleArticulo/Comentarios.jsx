import Comentario from './Comentario';

import './comentarios.scss';

function Comentarios({ comentarios }) {
    return (
        <div className="comentarios__container">
            <h3 className="comentarios__titulo">Comentarios:</h3>
            {comentarios.length === 0 ? (
                <p className="comentarios__no-commentarios">
                    No hay comentarios
                </p>
            ) : (
                comentarios.map((comentario) => (
                    <Comentario
                        key={comentario.fechaPublicacion}
                        comentario={comentario}
                    />
                ))
            )}
        </div>
    );
}

export default Comentarios;
