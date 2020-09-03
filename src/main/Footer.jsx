import React from 'react';
import{
    withRouter
} from 'react-router-dom';

import ConditionalRender from '../components/composition/ConditionalRender.jsx';

function Footer(props){
    const path = props.location.pathname;
    return (
        <>
            <div className="mvmargin secondary-line"/>
            <div
                style={{paddingBottom:"20px"}}
                className="alignright">
                Developed by
                <a
                    href="https://github.com/santiagomora"
                    target="_blank"
                    className="bolder shmargin ">
                    santiagomora.
                </a>
            </div>
        </>
    )
}

export default withRouter( Footer );
