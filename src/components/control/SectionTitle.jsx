import React from 'react';
import{
    RESOURCE_URL
} from '../../utils/api.jsx';

import ConditionalRender from '../composition/ConditionalRender.jsx';

const WIDTH = "50px";

export default function SectionTitle({
    title,
    iconurl,
    bgurl,
    description
}){
    const element = (
        <>
            <div className="iblock mrpadding">
                <img
                    className="asuper"
                    width={WIDTH}
                    src={`${RESOURCE_URL}${iconurl}`}/>
            </div>
            <div className="iblock">
                <h2 className="vmiddle alignleft bolder nomargin dfont">
                    {title}
                </h2>
                <ConditionalRender
                    condition={!description}
                    other={<></>}>
                    <p className="dfont nomargin">{description}</p>
                </ConditionalRender>
            </div>
        </>
    );
    return (
            <div className="row hideover">
                <div className="col-md-12 backconfig">
                    <div className="backconfig d-none d-md-block"
                        style={
                            bgurl
                                ? {backgroundImage:`url(${RESOURCE_URL}${bgurl})`}
                                : {}}>
                        {element}
                    </div>
                    <div className="d-md-none">
                        {element}
                    </div>
                </div>
            </div>
    );
}
