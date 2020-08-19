import React, {
    useContext
} from 'react';
import {
    ExchangeContext
} from '../hocs/OrderHandler.jsx';

export function DisplayGrid(data,gridElem,colNum){
    const context = useContext(ExchangeContext)
    let rows = [],
        cols = [],
        e,
        i,
        j,
        init=0,
        stop;
    for( i=0; i<data.length/colNum; i++ ){
        stop = colNum>data.length-i*colNum
            ? data.length-i*colNum
            : colNum;
        for( j=init; j<stop+init; j++){
            e = data[j];
            cols.push( gridElem({e,...context,cols:colNum}) )
        }
        rows.push( <div key={i} className="row">{cols}</div> )
        cols = [];
        init+=colNum;
    }
    return rows;
}
