import React from 'react';
import {
    Link
} from 'react-router-dom';
import{
    currencyChange
} from '../../components/helper/currencyChange.jsx';
import {
    plainArray
} from '../../components/helper/plainArray.jsx';
import {
    BASE_URL
} from '../../components/api.jsx';

export const COLUMNS = 4;

const WIDTH = 100;

const HEIGHT = 100;

export function gridElem({
    curr,
    shop,
    display,
    clickHandler
}) {
    return ({
        e,
        curr,
        rate,
        names,
        cols,
        shopCurrency
    }) => {
        const [currentName,price] = currencyChange({
                curr,
                rate,
                names,
                price:e.base_price,
                shop:shopCurrency
            }),
            variations = plainArray(e.variations);
        return (
            <button
                onClick={clickHandler({e,shop})}
                key={e.id}
                className={`hoverlight roundborder mvpadding aligncenter col-md-${12/cols}`}
                style={{
                    border:"solid 3px transparent",
                    padding:"15px 0px 15p 0px"
                }}>
                <div>
                    <img
                        src={`${BASE_URL}${e.pic}`}
                        width={`${WIDTH}px`}
                        height={`${HEIGHT}px`}/>
                </div>
                <div className="mvmargin">
                    <h5 className="bolder" style={{color:"var(--outline)"}}>
                        {e.name}
                    </h5>
                    <div>
                        <span className="bolder">base price:</span>
                        <span className="shmargin">{price}</span>
                        <span className="bolder" style={{color:"var(--main)"}}>{currentName}</span>
                    </div>
                </div>
                <p>{e.description}</p>
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
