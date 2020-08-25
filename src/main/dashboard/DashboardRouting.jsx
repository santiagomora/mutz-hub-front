import React from 'react';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import Dashboard from './Dashboard.jsx';

import Protected from '../../components/hocs/Protected.jsx';

import NotFound from '../../components/NotFound.jsx';

export default function DashboardRouting (props) {
    return (
        <Switch>
            <Route
                exact
                path={`${props.match.url}`}
                render={
                    (match) => (
                        <Dashboard
                            save={props.save}
                            user={props.user}
                            logout={props.logout}
                            {...match}/>
                    )
                }/>
            <Route
                path='*'
                exact={true}
                component={NotFound} />
        </Switch>
    );
}
