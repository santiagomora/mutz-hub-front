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
                className={`hoverlight roundborder mbpadding alignleft col-md-${12/cols}`}
                style={{
                    border:"solid 4px transparent"
                }}>
                <div className="iblock">
                    <div className="alignright svmargin">
                        <span
                            className="shmargin font20">
                            {round(data.base_price)}
                        </span>
                        <span
                            className="bolder"
                            style={{color:"var(--main)"}}>
                            {tag}
                        </span>
                        <div className="bolder" style={{marginTop:"-8px"}}>
                            base price
                        </div>
                    </div>
                    <div className="aligncenter svpadding"  style={{marginTop:"-8px"}}>
                        <img
                            style={{maxHeight:"100px"}}
                            src={`${RESOURCE_URL}${data.pic}`}/>
                    </div>
                    <h5 className="bolder" style={{color:"var(--outline)"}}>
                        {data.name}
                    </h5>
                    <div className="grayline svmargin"></div>
                    <p className="nomargin bolder">Ingredients:</p>
                    <p className="nomargin svmargin">{data.description}</p>
                    <div className="stmargin">
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
                </div>
            </button>
        )
    }
}
