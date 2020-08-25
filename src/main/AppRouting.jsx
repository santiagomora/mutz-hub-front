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
}from '../components/helper/saveHistory.jsx';

import AuthRouting from './auth/AuthRouting.jsx';

import OrderRouting from './orders/OrderRouting.jsx';

import DashboardRouting from './dashboard/DashboardRouting.jsx';

import Protected from '../components/hocs/Protected.jsx';

class AppRouting extends Component{
    constructor(props){
        super(props);
        this.saveHistory = saveHistory.bind(this);
    }

    render(){
        const props = this.props;
        return(
            <Switch>
                <Route
                    path={`${props.match.url}auth`}
                    render={
                        (match) => {
                            return(
                                <Protected
                                    condition={props.auth}
                                    redirect="/dashboard">
                                    <AuthRouting
                                        authenticate={props.authenticate}
                                        auth={props.auth}{...match}/>
                                </Protected>
                        )}
                    }/>
                <Route
                    path={`${props.match.url}dashboard`}
                    render={
                        (match) => (
                            <Protected
                                redirect="/auth"
                                condition={!props.auth}>
                                <DashboardRouting
                                    save={this.saveHistory}
                                    user={props.user}
                                    {...match}/>
                            </Protected>
                        )
                    }/>
                <Route
                    path={`${props.match.url}`}
                    component={
                        (match) =>{
                            return (
                                <OrderRouting
                                    save={this.saveHistory}
                                    {...match}/>
                            )
                        }
                    }/>
            </Switch>
        );
    }

}

export default withRouter( AppRouting );
