/**
 * react basic
 */
import React, {
    Component
} from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import ReactDOM from 'react-dom';

//import AuthControl from './AuthControl.jsx';
import OrderRouting from '../orders/OrderRouting.jsx';
import DashBoard from '../dashboard/DashBoard.jsx';
import OrderHandler from '../components/hocs/OrderHandler.jsx';

function AppRouting(props){
    return(
        <Router
            basename='/'>
            <Route
                path='/'
                render={
                    (match) => (
                        <OrderHandler {...match}>
                            <OrderRouting {...match} />
                        </OrderHandler>
                    )
                }/>
            <Route
                path='/dashboard'
                exact
                render={
                    (match) => (
                        <DashBoard
                            {...match}/>
                    )
                }/>
        </Router>
    );
}

export default AppRouting;
