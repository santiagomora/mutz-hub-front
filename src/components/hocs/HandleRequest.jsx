import React, {
    Component
} from 'react';
import axios from 'axios';
import {
    GET,
    POST,
    PUT
} from '../api.jsx';

const httpMethods ={
    get:GET,
    post:POST,
    put:PUT
}

export default class HandleRequest extends Component {

    constructor(props){
        super(props);
        this.state={pending:false}
        this.request = this.request.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    request({
        method,
        options,
        successCallback,
        errorCallback
    }){
        const CancelToken = axios.CancelToken;
        httpMethods[method]({
            cancelToken:new CancelToken(
                function executo(c) {
                    this.cancelRequest = c;
                }.bind(this)
            ),
            ...options
        })
        .then( successCallback )
        .catch(errorCallback)
    }

    cancel(){
        if (this.cancelRequest)
            this.cancelRequest("the request has been cancelled");
    }

    render(){
        return (
            React.cloneElement(
                this.props.children,{
                performRequest:this.request,
                cancelRequest:this.cancel
            })
        )
    }
}
