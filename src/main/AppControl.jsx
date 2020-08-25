import React, {
    Component
} from 'react';
import {
    retrieve,
    logout
} from './auth/Handlers.jsx';
import{
    AuthUser
} from '../components/helper/AuthUser.jsx';
import ReactDOM from 'react-dom';

import AppRouting from './AppRouting.jsx';

import OrderHandler from '../components/hocs/OrderHandler.jsx';

import LoadingComponent from '../components/hocs/LoadingComponent.jsx';

import AppFooter from './AppFooter.jsx';

import AppHeader from './AppHeader.jsx';

export default class AppControl extends Component {

    constructor(props){
        super(props);
        this.state={
            user:null,
            auth:false,
            loading:true
        }
        this.retrieve = retrieve.bind(this);
        this.logout = logout.bind(this);
        this.authenticateUser = this.authenticateUser.bind(this);
    }

    componentDidMount(){
        this.setState(
            { loading:true },
            () => {
                this.retrieve()
            }
        );
    }

    authenticateUser(user){
        this.setState({
            user:user,
            auth:true
        });
    }

    render() {
        const auth = this.state.auth,
            user = this.state.user;
        return (
            <AuthUser.Provider
                value={this.state.user||{}}>
                    <LoadingComponent
                        data={!this.state.loading}>
                        <AppHeader
                            user={this.state.user}
                            logout={this.logout}
                            authenticate={this.authenticateUser}
                            auth={this.state.auth}/>
                        <AppRouting
                            user={this.state.user}
                            authenticate={this.authenticateUser}
                            auth={this.state.auth}/>
                        <AppFooter/>
                    </LoadingComponent>
            </AuthUser.Provider>
        )
    }
}
