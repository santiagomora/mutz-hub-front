import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
import {
    GET,
    POST,
} from '../../utils/api';

export function login(data){
    return POST({
            endpoint: '/auth/login',
            data: JSON.stringify(data)
        })
        .then( res => {
            if (res.data.user)
                this.setState({
                    loading:false,
                    user:res.data.user,
                    auth:true
                })
            return res;
        })
}

export function logout({ err }){
    const obj = {
        loading:false,
        user:null,
        auth:false
    };
    if ( !err )
        return GET({endpoint:'/auth/logout',})
            .then ( res => {
                this.setState(
                    obj,
                    () => {
                        this.props.history.push({
                            pathname:'/login',
                            state:{
                                message:res.data
                            }
                        })
                    });
            })
            .catch(this.context.backEndError)
    else
        return this.setState(
            obj,
            () => {
                this.props.history.push({
                    pathname:'/login',
                    state:{
                        message:err.response.data
                    }
                })
            });
}

export function retrieve(){
    return GET({endpoint:'/auth/retrieve'})
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
