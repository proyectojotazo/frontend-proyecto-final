import Comentario from './Comentario';

function Comentarios({ comentarios }) {
    return (
        <div className="comentarios__container">
            Comentarios:
            {comentarios.map((comentario) => (
                <Comentario
                    key={comentario.fechaPublicacion}
                    comentario={comentario}
                />
            ))}
            
        </div>
    );
}

export default Comentarios;
