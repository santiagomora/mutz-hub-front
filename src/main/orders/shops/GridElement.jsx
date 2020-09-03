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
    round
} from '../../../helper/helperIndex.jsx'

export const COLUMNS = 3;

const WIDTH = "40%";

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
        <div
            key={data.id}
            className={`hoverlight roundborder col-md-${12/cols} nomargin`}>
            <button onClick={clickHandler(data)} className="wfull amargin block mhpadding mvpadding">
                <div className="alignright stmargin sbmargin">
                    <span className="shmargin font20">
                        {`${convert(data.currency,data.shipping)}`}
                    </span>
                    <span className="selected">
                        {tag}
                    </span>
                    <div
                        className="bolder"
                        style={{marginTop:"-8px"}}>
                        shipping
                    </div>
                </div>
                <div
                    style={{marginTop:"-8px"}}>
                    <img width={WIDTH} src={`${RESOURCE_URL}${data.pic}`}/>
                </div>
                <h5 className="bolder alignleft redfont stpadding">
                    {data.name}
                </h5>
                <div className="grayline svmargin"></div>
                <div className="alignleft">
                    {data.description}
                </div>
                <div className="container-fluid nopadding mtmargin">
                    <div className="row justify-content-around">
                    {
                        cat.map(
                            (d,i) => (
                                <div
                                    className={`col-xs-${12/cat.length} aligncenter hpadding`}
                                    key={i}>
                                    <div
                                        className="bolder variation stext"
                                        style={{padding:"0px 10px"}}>
                                        {`${data.stats[d].cnt} ${d}`}
                                    </div>
                                    <div className="bolder stext stmargin">
                                        {`${convert(data.currency,data.stats[d].avg)}`}
                                        <span className="selected shmargin">
                                            {tag}
                                        </span>
                                    </div>
                                    <div className="stext">on average</div>
                                </div>
                            )
                        )
                    }
                    </div>
                </div>
            </button>
        </div>
    )
}
