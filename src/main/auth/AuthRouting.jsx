import React from 'react';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import Login from './component/Login.jsx'

import Register from './component/Register.jsx'

import Protected from '../../components/hocs/Protected.jsx';

import NotFound from '../../components/NotFound.jsx';

export default function AuthRouting (props) {
    return (
        <Switch>
            <Route
                path={`${props.match.url}/register`}
                render={
                    (match) => {
                        return(
                            <Register
                                authenticate={props.authenticate}
                                login={props.login}
                                {...match}/>
                    )}
                }/>
            <Route
                path={`${props.match.url}`}
                render={
                    (match) => (
                        <Login
                            authenticate={props.authenticate}
                            login={props.login}
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
