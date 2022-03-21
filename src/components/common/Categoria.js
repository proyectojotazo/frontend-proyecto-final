import React from 'react';
import './categoria.scss';

function Categoria({ categoria, cambiarCategoria }) {
    return (
        <div className="divCategorias">
            {categoria.map((lenguaje) => (
                <p
                    key={lenguaje}
                    className={`cat ${lenguaje}`}
                    onClick={() => {
                        cambiarCategoria(lenguaje === 'todas' ? '' : lenguaje);
                    }}
                >
                    &lt;{lenguaje}&gt;
                </p>
            ))}
        </div>
    );
}

export default Categoria;
