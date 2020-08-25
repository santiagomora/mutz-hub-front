import React, {
    Component
} from 'react';
import {
    login
} from '../Handlers.jsx';

import ReactDOM from 'react-dom';

import Link from '../../../components/control/Link.jsx';

import ValidationHandler from '../../../components/hocs/ValidationHandler.jsx';

import LoginForm from '../form/LoginForm.jsx';

import Loader from 'react-loader-spinner';

const validation = {
    email:{
        email:true,
        required:true,
        max:100
    },
    password:{
        required:true
    }
}

const fieldDisplay ={
    password:"Password",
    email:"Email",
}

const form ={
    password:"",
    email:""
}

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading:false,
            error:null
        }
        this.submit = login.bind(this);
    }

    render(){
        const {location} = this.props;
        return (
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-md-6" >
                        <h1 className="app-title bolder">
                            the mutz hub.
                        </h1>
                        You don't need to login to
                        <Link to="/">
                            <span className="button bolder shmargin mhpadding">
                                make an order
                            </span>
                        </Link>
                        {
                            this.state.error
                            ?   <p
                                    className="bolder nomargin mtpadding"
                                    style={{color:"var(--outline)"}}>
                                    {this.state.error}
                                </p>
                            : <></>
                        }
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-6 nopadding">
                        <ValidationHandler
                            submit={this.submit}
                            fieldDisplay={fieldDisplay}
                            validation={validation}
                            form = {form}>
                            <LoginForm
                                location={location.state}
                                loading={this.state.loading}/>
                        </ValidationHandler>
                    </div>
                </div>
            </div>
        )
    }
}
