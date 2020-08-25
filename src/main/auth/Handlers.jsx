import React from 'react';
import {
    POST,
    GET
} from '../../components/api.jsx';

export function retrieve(){
    return GET({
            url:'/auth/client/retrieve'
        })
        .then( res => {
            if (res.data.user)
                this.setState({
                    loading:false,
                    user:res.data.user,
                    auth:true
                })
            return res
        })
        .catch( (err) => {
            this.setState({
                loading:false,
                user:null,
                auth:false
            })
        });
}

export function login( form ){
    const loc = (this.props.location||{}).state;
    this.setState(
        {loading:true},
        () =>
            POST({
                url:"/auth/client/login",
                data:{...form}
            })
            .then(
                res =>
                    this.setState({
                        loading:false,
                        success:res.data.msg,
                        error:null
                    },
                    () => {
                            if ( res.data.user )
                                this.props.authenticate(res.data.user);
                        }
                    )
            )
            .catch(
                err =>
                this.setState({
                    loading:false,
                    error:"invalid email or password."
                })
            )
        )
}

export function register( form ){
    const loc = (this.props.location||{}).state;
    this.setState(
        {loading:true},
        () =>
            POST({
                url:"/auth/client/register",
                data:form
            })
            .then(
                res => {
                    this.setState({
                            loading:false,
                            success:res.data.msg
                        },
                        () => {
                            if ( res.data.user )
                                this.props.authenticate(res.data.user);
                        }
                    )

                }
            )
            .catch(
                err => {
                    console.log(err);
                }
            )
    )
}


export function logout(  ){
    this.setState(
        {loading:true},
        () =>
        GET({
            url:"/auth/client/logout"
        })
        .then(
            res => {
                this.setState({
                    loading:false,
                    msg:res.data.msg,
                    loading:false,
                    auth:false,
                    user:null
                })
            }
        )
        .catch(
            err => {
                console.log(err);
            }
        )
    )
}
