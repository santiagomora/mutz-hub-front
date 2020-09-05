import React from 'react';
import {round} from './round.jsx';

function variationsTotal(variations){
    return variations.reduce(
        (t,e) => t+e.var_price,0
    )
}

function extrasTotal(extras){
    return extras.reduce(
        (t,e) => t+e.ext_price,0
    )
}

export function getItemTotal(item,conversion){
    const vari = variationsTotal(item.variations),
        ext = extrasTotal(item.extras);
    return round(
        (vari+ext+item.om_price)*item.om_quantity*conversion
    );
}
