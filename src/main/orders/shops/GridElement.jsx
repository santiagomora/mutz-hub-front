import React from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';
import  ReactDOM from 'react-dom';
import {
    BASE_URL
} from '../../../components/api.jsx';

export const COLUMNS = 3;

export function GridElement({
    data,
    extra,
    cols
}){
    const {names,curr,rate} = extra.change,
          currentName = names[curr-1],
          currentRate = data.currency === curr
                ? 1
                : rate[currentName];
    return (
        <div
            key={data.id}
            className={`hoverlight roundborder mvpadding col-md-${12/COLUMNS}`}
            style={{border:"solid 4px transparent"}}>
            <Link to={{
                    pathname:`/menu/${data.id}`,
                    state:{
                        ...extra,
                        shop:{
                            id:             data.id,
                            name:           data.name,
                            description:    data.description,
                            extras:         data.extras,
                            currency:       data.currency,
                            pic:            data.pic
                        }
                    }
                }}>
                <h5 className="bolder" style={{color:"var(--outline)"}}>
                    {data.name}
                </h5>
                <img width="100px" height="100px" src={`${BASE_URL}${data.pic}`}/>
                <div className="bolder">
                    currency:
                    <span className="shmargin" style={{color:"var(--main)"}}>
                        {names[data.currency-1]}
                    </span>
                </div>
                <div>
                    {data.description}
                </div>
                <div className="grayline mvmargin"></div>
                <div>
                {
                    Object.keys(data.stats).map(
                        (d,i) => (
                            <div key={i} className="stext">
                                {`${data.stats[d].cnt} different ${d},`}
                                <span className="bolder stext shmargin">
                                    {`${Math.round(data.stats[d].avg*currentRate*100)/100} ${currentName}`}
                                </span>
                                average
                            </div>
                        )
                    )
                }
                </div>
            </Link>
        </div>
    )
}
