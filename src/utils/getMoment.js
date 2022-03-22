import moment from 'moment';

import 'moment/locale/es';

/**
 * Devuelve el momento en el que se creó
 * Replace 'arregla' el 'Creado en 5 dias' por 'Creado hace 5 dias'
 */
const getMoment = (date) => {
    const articleDate = new Date(date).getTime()
    const now = Date.now()
    
    const publicado = `Publicado ${moment(date).startOf('seconds').fromNow().replace('en', 'hace')}`    
    const pendiente = `Publicación ${moment(date).startOf('seconds').fromNow()}`

    return articleDate > now ? pendiente : publicado
};

export default getMoment;
