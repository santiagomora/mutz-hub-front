import React from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom'

function CustomLink({
    to,
    location,
    children
}){
    const state = location.state;
    return(
        <Link to={{pathname:to,state}}>
            {children}
        </Link>
    )
}

export default withRouter( CustomLink );
