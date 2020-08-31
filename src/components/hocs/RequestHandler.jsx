import React, {
    Component
} from 'react';
import axios from 'axios';
import {
    GET,
    POST,
    PUT
} from '../../utils/api.jsx';

import LoadingComponent from '../composition/LoadingComponent.jsx';

const httpMethods ={
    get:GET,
    post:POST,
    put:PUT
}

export default function RequestHandler( Target,config ) {

    return class handler extends Component {

        constructor(props){
            super(props);
            this.state={data:null,url:""}
            this.request = this.request.bind(this);
            this.cancel = this.cancel.bind(this);
            this.successHandler = this.successHandler.bind(this);
            this.errorHandler = this.errorHandler.bind(this);
            this.ismounted = true;
        }

        successHandler( res ){
            this.setState({data:res.data})
        }

        errorHandler( err ){
            if (!axios.isCancel(err))
                console.log(err)
        }

        request( {options,method,onSuccess,onError} ){
            const CancelToken = axios.CancelToken,
                opt = options(this.props.params),
                success = onSuccess
                    ? onSuccess
                    : this.successHandler,
                error = onError
                    ? onError
                    : this.errorHandler;
            httpMethods[method]({
                cancelToken:new CancelToken(
                    function( c ) {
                        this.cancelRequest = c;
                    }.bind(this)
                ),
                ...opt
            })
            .then( success )
            .catch( error )
        }

        cancel(){
            if ( this.cancelRequest )
                this.cancelRequest("the request has been cancelled");
        }

        componentDidMount(){
            let url;
            if ( this.props.requestOnMount ){
                this.request(config);
            } else this.setState({data:true})
        }

        componentWillUnmount(){
            this.cancel();
        }

        render(){
            const {data} = this.state;
            return (
                <LoadingComponent
                    data={data}>
                    <Target
                        {...this.props}
                        requestHandler = {this.request}
                        data={data}/>
                </LoadingComponent>
            )
        }
    }
}
