import React from 'react';
import{
    currencyChange,
    plainArray,
    round
} from '../../../helper/helperIndex.jsx';
import {
    RESOURCE_URL
} from '../../../utils/api.jsx';

export const COLUMNS = 3;

const WIDTH = "100%";

export function GridElement({
    clickHandler
}) {
    return ({
        data,
        extra,
        cols
    }) => {
        const {change,convert,shop,extras} = extra,
            {curr,rate,tag} = change,
            price = convert(shop.currency,data.base_price),
            variations = plainArray(Object.values(data.variations));
        return (
            <button
                onClick={
                    clickHandler({
                        data:{
                            ...data,
                            extras
                        },
                        shop
                    })
                }
                key={data.id}
                className={`hoverlight roundborder mpadding alignleft col-md-${12/cols}`}
                style={{
                    border:"solid 4px transparent"
                }}>
                <h5 className="bolder" style={{color:"var(--outline)"}}>
                    {data.name}
                </h5>
                <div className="grayline svmargin"></div>
                <div className="alignright">
                    <span className="bolder stext">base price:</span>
                    <span className="shmargin">{round(data.base_price)}</span>
                    <span className="bolder" style={{color:"var(--main)"}}>{tag}</span>
                </div>
                <div className="aligncenter svpadding">
                    <img
                        style={{maxHeight:"100px"}}
                        src={`${RESOURCE_URL}${data.pic}`}/>
                </div>
                <p className="nomargin bolder">Ingredients:</p>
                <p className="nomargin">{data.description}</p>
                <div>
                {
                    variations.map(
                        (t,i) => (
                            <span key={i} className="bolder srmargin iblock variation stext"
                                style={{padding:"0px 5px"}}>
                                {t.var_name}
                            </span>
                        )
                    )
                }
                </div>
            </button>
        )
    }
}
