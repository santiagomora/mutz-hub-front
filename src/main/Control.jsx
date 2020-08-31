import React, {
    Component
} from 'react';

import UserHandler from '../components/hocs/UserHandler.jsx';

import Routing from './Routing.jsx';

function Control(props) {
    return (
        <Routing
            user={props.user}
            auth={props.auth}
            logout={props.logout}/>
    )
}

export default UserHandler( Control );
