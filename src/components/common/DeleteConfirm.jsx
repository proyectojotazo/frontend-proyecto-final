import React from 'react';
import SweetAlert2 from 'react-sweetalert2';
import { useAuth } from '../../contexts/authContext';

import './DeleteConfirm.scss';

function DeleteConfirm({ show, msg, confirm, cancel }) {
    const { t } = useAuth();
    const showConfirm = {
        show: show,
        showCancelButton: true,
        showConfirmButton: true,
        showCloseButton: true,
        confirmButtonText: t('common.delete'),
        cancelButtonText: t('common.cancel'),
    };

    return (
        <div>
            <SweetAlert2
                {...showConfirm}
                onResolve={({ isConfirmed }) => {
                    if (isConfirmed) {
                        confirm();
                        return;
                    }
                    cancel();
                }}
            >
                <h4 className="delete-msg">{msg}</h4>
            </SweetAlert2>
        </div>
    );
}

export default DeleteConfirm;
