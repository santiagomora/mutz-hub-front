import React, {
    Component
} from 'react';

import AuthUser from '../../context/AuthUser.jsx';

import RequestHandler from './RequestHandler.jsx';

function UserHandler ( Target ){

    return class handler extends Component {

        constructor( props ){
            super( props );
            this.state = {user:null,auth:false};
            this.logout = this.logout.bind(this);
            this.authenticate = this.authenticate.bind(this)
        }

        componentDidMount(){
            const data = this.props.data;
            if (this.props.data){
                this.setState({
                    user:data.user||null,
                    auth:data.user ? true : false
                })
            }
        }

        logout(){
            this.props.requestHandler({
                method:'get',
                options:() => ({
                    url:"/auth/client/logout"
                }),
                onSuccess:
                    res => {
                        this.setState({
                            auth:false,
                            user:null
                            })
                    },
                onError: (err) => console.log(err)
            });
        }

        authenticate(user,callback){
            this.setState(
                {user,auth:true},
                () => callback()
            );
        }

        render(){
            const {user,auth} = this.state,
                logout = this.logout;
            return (
                <AuthUser.Provider
                    value={{
                        user,
                        auth,
                        logout,
                        authenticate:this.authenticate}}>
                    <Target
                        logout={logout}
                        user={user}
                        auth={auth}/>
                </AuthUser.Provider>
            )
        }
    }
}

export default function ( Target ) {
    return RequestHandler(
        UserHandler( Target ),{
            options:(params) => ({
                url:'/auth/client/retrieve'
            }),
            method:'get'
    })
}
