import React from 'react';
import{
    currencyChange
} from '../../../components/helper/currencyChange.jsx';
import {
    plainArray
} from '../../../components/helper/plainArray.jsx';
import {
    BASE_URL
} from '../../../components/api.jsx';

export const COLUMNS = 4;

const WIDTH = 100;

const HEIGHT = 100;

export function GridElement({
    clickHandler
}) {
    return ({
        data,
        extra,
        cols
    }) => {
        const {curr,rate,names} = extra.change,
            shop = extra.shop,
            [currentName,price] = currencyChange({
                curr,
                rate,
                names,
                price:data.base_price,
                shop:shop.currency
            }),
            variations = plainArray( data.variations );

        return (
            <button
                onClick={clickHandler({data,shop})}
                key={data.id}
                className={`hoverlight roundborder mpadding alignleft col-md-${12/cols}`}
                style={{
                    border:"solid 4px transparent"
                }}>
                <div>
                    <img
                        src={`${BASE_URL}${data.pic}`}
                        width={`${WIDTH}px`}
                        height={`${HEIGHT}px`}/>
                </div>
                <div>
                    <h5 className="bolder" style={{color:"var(--outline)"}}>
                        {data.name}
                    </h5>
                </div>
                <div>
                    <span className="bolder">base price:</span>
                    <span className="shmargin">{price}</span>
                    <span className="bolder" style={{color:"var(--main)"}}>{currentName}</span>
                </div>
                <p>{data.description}</p>
                <div>
                {
                    variations.map(
                        (t,i) => (
                            <span key={i} className="bolder smargin iblock variation stext">
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
