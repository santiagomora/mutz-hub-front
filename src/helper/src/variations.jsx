import React from 'react';

export function Variations({data}){
    return data.length>0
        ? data.map(
            (t,i) => (
                <span key={i} className="bolder srmargin iblock variation stext"
                style={{padding:"0px 5px"}}>
                {t.var_name}
                </span>
            )
        )
        : <></>
}
