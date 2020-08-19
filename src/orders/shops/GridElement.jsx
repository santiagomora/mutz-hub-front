import React from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';
import  ReactDOM from 'react-dom';
import {
    BASE_URL
} from '../../components/api.jsx';

export const COLUMNS = 3;

function gridNormalElem({
    e,
    curr,
    rate,
    names,
    location,
    history
}){
    const currentName = names[curr-1],
        currentRate = e.currency === curr
            ? 1
            : rate[currentName.toLowerCase()];
    return (
        <div
            key={e.id}
            className={`hoverlight roundborder mvpadding col-md-${12/COLUMNS}`}
            style={{border:"solid 3px transparent"}}>
            <Link to={{
                    pathname:`order/${e.id}`,
                    state:{
                        ...location.state||{},
                        shop:{
                            id:e.id,
                            name:e.name,
                            description:e.description,
                            extras:e.extras,
                            currency:e.currency,
                            pic:e.pic
                        }
                    }
                }}>
                <img width="100px" height="100px" src={`${BASE_URL}${e.pic}`}/>
                <h5 className="bolder" style={{color:"var(--outline)"}}>{e.name}</h5>
                <div>{e.description}</div>
                <div className="bolder">
                    currency:
                    <span className="shmargin" style={{color:"var(--main)"}}>
                        {currentName}
                    </span>
                </div>
                <div className="grayline mvmargin"></div>
                <div>
                {
                    Object.keys(e.stats).map(
                        (d,i) => (
                            <div key={i} className="stext">
                                {`${e.stats[d].cnt} different ${d},`}
                                <span className="bolder stext shmargin">
                                    {`${Math.round(e.stats[d].avg*currentRate*100)/100} ${currentName}`}
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

const gridElem = withRouter(gridNormalElem);

export {gridElem};
