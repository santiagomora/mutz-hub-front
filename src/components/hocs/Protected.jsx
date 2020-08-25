import React, {
    Component
} from 'react';
import {
    Redirect,
    withRouter
} from 'react-router-dom';

function Protected({
    condition,
    children,
    redirect,
    location
}){
    return (
        condition
            ? <Redirect to={{
                    pathname:redirect,
                    state:location.state
                }}/>
            : children
    )
}

export default withRouter( Protected );
