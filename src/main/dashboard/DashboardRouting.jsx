import React from 'react';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import HeaderHandler from '../../components/hocs/HeaderHandler.jsx';

import OrderHandler from '../../components/hocs/OrderHandler.jsx'

import Dashboard from './Dashboard.jsx';

import NotFound from '../../components/NotFound.jsx';

import Footer from '../../main/Footer.jsx';

function DashboardRouting (props) {
    return (
        <Switch>
            <Route
                exact
                path={`${props.match.url}`}
                render={
                    (match) => (
                        <Dashboard
                            {...match}
                            {...props}
                            params={{id:props.user.cli_id}}
                            requestOnMount={true}/>
                    )
                }/>
            <Route
                path='*'
                exact={true}
                component={NotFound} />
        </Switch>
    );
}

export default HeaderHandler( OrderHandler( DashboardRouting,true ) );
