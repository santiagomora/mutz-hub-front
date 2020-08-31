import React, {
    Component
} from 'react';
import {
    Switch,
    Route,
    withRouter
} from 'react-router-dom';
import {
    saveHistory
}from '../helper/helperIndex.jsx';

import AuthUser from '../context/AuthUser.jsx';

import AuthRouting from './auth/AuthRouting.jsx';

import OrderRouting from './orders/OrderRouting.jsx';

import DashboardRouting from './dashboard/DashboardRouting.jsx';

import Protected from '../components/composition/Protected.jsx';

import Footer from './Footer.jsx';

function Routing (props){
    return(
        <Switch>
            <Route
                path={`${props.match.url}auth`}
                render={
                    (match) => (
                        <Protected
                            condition={props.auth}
                            redirect="/dashboard">
                            <AuthRouting
                                auth={props.auth}
                                {...match}/>
                        </Protected>
                    )
                }/>
            <Route
                path={`${props.match.url}dashboard`}
                render={
                    (match) => (
                        <Protected
                            redirect="/auth"
                            condition={!props.auth}>
                            <DashboardRouting
                                user={props.user}
                                requestOnMount={true}
                                {...match}/>
                            <Footer/>
                        </Protected>
                    )
                }/>
            <Route
                path={`${props.match.url}`}
                component={
                    (match) => (
                        <>
                            <OrderRouting
                                requestOnMount
                                {...match}/>
                            <Footer/>
                        </>
                    )
                }/>
        </Switch>
    );

}
export default withRouter( Routing )
