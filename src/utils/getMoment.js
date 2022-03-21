import moment from 'moment';

import 'moment/locale/es';

/**
 * Devuelve el momento en el que se creó
 * Replace 'arregla' el 'Creado en 5 dias' por 'Creado hace 5 dias'
 */
const getMoment = (date) => {
    return moment(date).startOf('seconds').fromNow().replace('en', 'hace');
};

export default getMoment;
