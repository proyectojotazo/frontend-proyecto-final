import React from 'react';
import SweetAlert2 from 'react-sweetalert2';

import './DeleteConfirm.scss';

function DeleteConfirm({ show, msg, confirm }) {
    const showConfirm = {
        show: show,
        text: msg,
        showCancelButton: true,
        showConfirmButton: true,
        showCloseButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
    };

    return (
        <div className="delete-confirm">
            <SweetAlert2
                {...showConfirm}
                didClose={show()}
                onCancel={show()}
                onConfirm={() => confirm()}
            />
        </div>
    );
}

export default DeleteConfirm;
