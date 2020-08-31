import React, {
    Component,
    useContext
} from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';
import {
    GET
} from '../utils/api.jsx';
import {
    saveHistory,
    storage
} from '../helper/helperIndex.jsx';

import AuthUser from '../context/AuthUser.jsx';

import ConditionalRender from '../components/composition/ConditionalRender.jsx';

import LoadingComponent from '../components/composition/LoadingComponent.jsx';

import BreadCrumb from '../components/control/BreadCrumb.jsx';

import Title from '../components/control/Title.jsx';

const CURRENCY = ["USD","EUR"];

const exclude = ["auth"];

const matchExcluded = ( path ) =>
    exclude.filter(
        e => path.match( e )
    ).pop();

function Header ({
    location,
    change,
    convert,
    requestHandler
}) {
    const {pathname} = location,
        {user,logout,auth} = useContext(AuthUser);
    return (
        <div className="container-fluid">
            <ConditionalRender
                condition={matchExcluded(pathname)}
                other = {<></>}>
                <div className="row justify-content-center">
                    <Title
                        currency={CURRENCY}
                        change ={change}
                        logout={logout}
                        changeCurrency={convert}
                        user={user}/>
                </div>
                <div className="line mvmargin"/>
            </ConditionalRender>
        </div>
    )
}

export default withRouter( Header );
