import Comentario from './Comentario';

import './comentarios.scss';

function Comentarios({ ownerArt, comentarios, deleteComments }) {
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
                        ownerArt={ownerArt}
                        comentario={comentario}
                        deleteComments={deleteComments}
                    />
                ))
            )}
        </div>
    );
}

export default Comentarios;
