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

const WIDTH = "100px";

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
                <h5 className="bolder alignleft redfont">
                    {data.name}
                </h5>
                <div className="grayline svmargin"></div>
                <div className="stext shmargin mbmargin alignright">
                    <span className="bolder">
                        base currency:
                    </span>
                    <span className="selected shmargin">
                        {names[data.currency-1]}
                    </span>
                </div>
                <img width={WIDTH} src={`${RESOURCE_URL}${data.pic}`}/>
                <div className="alignleft stmargin">
                    <span className="bolder">shipping:</span>
                    <span>{`${convert(data.currency,data.shipping)}`}</span>
                    <span className="selected shmargin">
                        {tag}
                    </span>
                </div>
                <div className="alignleft">
                    {data.description}
                </div>
                <div className="container-fluid nopadding mtmargin">
                    <div className="row">
                    {
                        cat.map(
                            (d,i) => (
                                <div
                                    className={`col-md-${12/cat.length}`}
                                    key={i}>
                                    <div className="bolder variation nopadding stext">
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
