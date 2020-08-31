import React,{
    useContext
} from 'react';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import AuthUser from '../../context/AuthUser.jsx';

import Login from './component/Login.jsx'

import Register from './component/Register.jsx'

import NotFound from '../../components/NotFound.jsx';

export default function AuthRouting (props) {
    const auth = useContext( AuthUser );
    return (
        <Switch>
            <Route
                path={`${props.match.url}/register`}
                render={
                    (match) => {
                        return(
                            <Register
                                authenticate={auth.authenticate}
                                requestOnMount={false}
                                {...match}/>
                    )}
                }/>
            <Route
                path={`${props.match.url}`}
                render={
                    (match) => (
                        <Login
                            authenticate={auth.authenticate}
                            requestOnMount={false}
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
