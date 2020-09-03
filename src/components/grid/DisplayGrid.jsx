import React, {
    useContext
} from 'react';

export function DisplayGrid({
    data,
    extra,
    GridElement,
    colNum
}){
    let rows = [],
        cols = [],
        init=0,
        stop;

    for( let i=0; i<data.length/colNum; i++ ){
        stop = colNum>data.length-i*colNum
            ? data.length-i*colNum
            : colNum;

        for( let j=init; j<stop+init; j++){
            cols.push(
                GridElement({
                    data:data[j],
                    extra,
                    cols:colNum
                })
            )
        }

        rows.push(
            <div key={i} className="row displayflex">{cols}</div>
        );

        cols = [];
        init+=colNum;
    }

    return rows;
}
