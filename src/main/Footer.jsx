import React from 'react';
import{
    withRouter
} from 'react-router-dom';

import ConditionalRender from '../components/composition/ConditionalRender.jsx';

const exclude = ["auth"];

const matchExcluded = ( path ) =>
    exclude.filter(
        e => path.match( e )
    ).pop();

function Footer(props){
    const path = props.location.pathname;
    return (
        <ConditionalRender
            condition={matchExcluded(path)}
            other = {<></>}>
            <div className="container-fluid">
                <div className="mvmargin secondary-line"/>
                <div className="row col-md-12">
                    <div
                        style={{paddingBottom:"20px"}}
                        className="alignright">
                        Developed by
                        <span className="bolder shmargin">santiagomora.</span>
                    </div>
                </div>
            </div>
        </ConditionalRender>
    )
}

export default withRouter( Footer );
