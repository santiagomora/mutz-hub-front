import React from 'react';
import{
    currencyChange,
    plainArray,
    round,
    Variations,
    LargePrice
} from '../../../helper/helperIndex.jsx';
import {
    RESOURCE_URL
} from '../../../utils/api.jsx';
export const COLUMNS = 3;

const WIDTH = "130px";

const HEIGHT = "130px";

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
                <div className="wfull">
                    <div className="alignright svmargin">
                        <LargePrice
                            text=""
                            price={convert(shop.currency,data.base_price)}
                            currency={<span className="mtext">{tag}</span>}/>
                        <div className="bolder" style={{marginTop:"-8px"}}>
                            base price
                        </div>
                    </div>
                    <div className="aligncenter svpadding"  style={{marginTop:"-8px"}}>
                        <img
                            height={HEIGHT}
                            width={WIDTH}
                            src={`${RESOURCE_URL}${data.pic}`}/>
                    </div>
                    <h5 className="bolder redfont" style={{color:"var(--outline)"}}>
                        {data.name}
                    </h5>
                    <div className="grayline svmargin"></div>
                    <p className="nomargin bolder">Ingredients:</p>
                    <p className="nomargin svmargin">{data.description}</p>
                </div>
                <div className="wfull">
                    <div className="stmargin">
                        <Variations data={variations}/>
                    </div>
                </div>
            </button>
        )
    }
}
