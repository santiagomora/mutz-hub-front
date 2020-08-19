import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import {
    Route,
    Switch
} from 'react-router-dom';
import {
    DisplaysMessages
} from '../app/hocs/MessageHandler';
import {
    login,
    logout,
    retrieve
} from '../app/handlers/sub/loginHandlers';

import WaitEvent from '../app/hocs/WaitEvent';
import Login from '../escritorio/Login';
import Escritorio from '../escritorio/Escritorio';

const AuthUser = React.createContext({});

export default class AuthControl extends Component {
    constructor(props){
        super(props);
        this.state={
            user:null,
            auth:false,
            loading:true
        }
        this.login = login.bind(this);
        this.logout = logout.bind(this);
        this.retrieve = retrieve.bind(this);
    }

    static contextType = DisplaysMessages;

    componentDidMount(){
        const loc = this.props.location.pathname;
        this.setState(
            { loading:true },
            () => this.retrieve()
        );
    }

    render() {
        return (
            <AuthUser.Provider value={this.state.user}>
                <Switch>
                    <Route path='/escritorio'
                        render={
                            (match) => (
                                <WaitEvent cond={this.state.loading}>
                                    <Escritorio user={this.state.user}
                                        auth={this.state.auth}
                                        loading={this.state.loading}
                                        redirect="/login"
                                        logout={this.logout}
                                        {...match}/>
                                </WaitEvent>
                            )
                        }/>
                    <Route path='/login'
                        exact
                        render={
                            (match) => (
                                <WaitEvent cond={this.state.loading}>
                                    <Login auth={this.state.auth}
                                        login={this.login}
                                        redirect="/escritorio"
                                        {...match}/>
                                </WaitEvent>
                            )
                        }/>
                </Switch>
            </AuthUser.Provider>
        )
    }
}
