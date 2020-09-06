import React from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';
import  ReactDOM from 'react-dom';
import {
    RESOURCE_URL
} from '../../../utils/api.jsx';
import {
    round,
    LargePrice,
    Price
} from '../../../helper/helperIndex.jsx'

export const COLUMNS = 3;

const WIDTH = "40%";

const HEIGHT = "40%";

export function GridElement({
    data,
    extra,
    cols
}){
    const {convert,change} = extra,
        {tag,curr,names} = change,
        clickHandler = (data) => {
            return e => {
                e.preventDefault();
                extra.click(data);
            }
        },
        cat = Object.keys(data.stats);
    return (
        <button
            key={data.id}
            onClick={clickHandler(data)}
            className={`hoverlight roundborder col-md-${12/cols} mvpadding`}>
            <div className="wfull">
                <div className="alignright sbmargin">
                    <LargePrice
                        text=""
                        price={convert(data.currency,data.shipping)}
                        currency={<span className="mtext">{tag}</span>}/>
                    <div
                        className="bolder"
                        style={{marginTop:"-8px"}}>
                        shipping
                    </div>
                </div>
                <div
                    style={{marginTop:"-8px"}}>
                    <img
                        height={HEIGHT}
                        width={WIDTH}
                        src={`${RESOURCE_URL}${data.pic}`}/>
                </div>
                <h5 className="bolder alignleft redfont stpadding">
                    {data.name}
                </h5>
                <div className="grayline svmargin"></div>
                <div className="alignleft">
                    {data.description}
                </div>
            </div>
            <div className="wfull">
                <div className="container-fluid nopadding mtmargin">
                    <div className="row justify-content-around">
                    {
                        cat.map(
                            (d,i) => (
                                <div
                                    className={`col-xs-${12/cat.length} aligncenter hpadding`}
                                    key={i}>
                                    <div
                                        className="bolder variation stext sbmargin"
                                        style={{padding:"0px 10px"}}>
                                        {`${data.stats[d].cnt} ${d}`}
                                    </div>
                                    <Price
                                        text=""
                                        price={convert(data.currency,data.stats[d].avg)}
                                        currency={tag}/>
                                    <div className="stext bolder aligncenter">on average</div>
                                </div>
                            )
                        )
                    }
                    </div>
                </div>
            </div>
        </button>
    )
}
