import React from 'react';
import {round} from './round.jsx';

export function Price(props){
    const {text,price,currency} = props,
        sum = props.withSum ? "+":"";
    return (
        <>
            <span>{text}</span>
            <span className="shmargin">{`${sum}${round(price)}`}</span>
            <span className="bolder selected">{currency}</span>
        </>
    )
}


export function LargePrice(props){
    const {text,price,currency} = props,
        sum = props.withSum ? "+":"";
    return (
        <>
            <h5 className="iblock">{text}</h5>
            <h4 className="iblock shmargin">{`${sum}${round(price)}`}</h4>
            <h5 className="iblock bolder selected">{currency}</h5>
        </>
    )
}
