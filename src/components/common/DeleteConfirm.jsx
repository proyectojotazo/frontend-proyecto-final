import React from 'react';
import SweetAlert2 from 'react-sweetalert2';

import './DeleteConfirm.scss';

function DeleteConfirm({ show, msg, confirm, cancel }) {
    const showConfirm = {
        show: show,
        showCancelButton: true,
        showConfirmButton: true,
        showCloseButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
    };

    return (
        <div>
            <SweetAlert2
                {...showConfirm}
                didClose={() => cancel()}
                onConfirm={() => confirm()}
            >
                <h4 className="delete-msg">{msg}</h4>
            </SweetAlert2>
        </div>
    );
}

export default DeleteConfirm;
