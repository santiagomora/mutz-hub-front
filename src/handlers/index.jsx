import {promocionesHandlers} from './sub/promocionesHandlers';
import {escritorioHandlers} from './sub/escritorioHandlers';
import {localesHandlers} from './sub/localesHandlers';
import {reservasHandlers} from './sub/reservasHandlers';
import {ubicacionesHandlers} from './sub/ubicacionesHandlers';
import {franquiciasHandlers} from './sub/franquiciasHandlers';
import {eventosHandlers} from './sub/eventosHandlers';
import {horariosHandlers} from './sub/horariosHandlers';
import {feriadosHandlers} from './sub/feriadosHandlers';
import {configuracionHandlers} from './sub/configuracionHandlers';

export const handlers = {
    escritorio:escritorioHandlers,
    promociones:promocionesHandlers,
    locales:localesHandlers,
    reservas:reservasHandlers,
    ubicaciones:ubicacionesHandlers,
    franquicias:franquiciasHandlers,
    eventos:eventosHandlers,
    horarios:horariosHandlers,
    feriados:feriadosHandlers,
    configuracion:configuracionHandlers,
};

export const handlerArray = Object.values(handlers).reduce((t,e) => t.concat(e.list),[])
