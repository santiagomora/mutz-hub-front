import React, {
    Component
} from 'react';
import {
    register
} from '../Handlers.jsx';
import {
    POST
} from '../../../components/api.jsx';

import ReactDOM from 'react-dom';

import Link from '../../../components/control/Link.jsx'

import ValidationHandler from '../../../components/hocs/ValidationHandler.jsx';

import RegisterForm from '../form/RegisterForm.jsx';

import Loader from 'react-loader-spinner';

const validation = {
    cli_password:{
        required:true
    },
    cli_address:{
        required:true,
        max:100
    },
    cli_telephone:{
        required:true,
        numeric:true,
        max:30
    },
    cli_name:{
        required:true,
        max:50
    },
    cli_email:{
        email:true,
        required:true,
        max:80
    }
}

const fieldDisplay ={
    cli_address:"Delivery address",
    cli_telephone:"Phone number",
    cli_name:"Name",
    cli_email:"Email",
    cli_password:"Password"
}

const form ={
    cli_address:"",
    cli_telephone:0,
    cli_name:"",
    cli_email:"",
    cli_password:"",
    cli_email:""
}

export default class Register extends Component {

    constructor(props){
        super(props);
        this.state = {
            loading:false
        }
        this.submit = register.bind(this);
    }

    render(){
        console.log(this.props)
        const {location} = this.props
        return (
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-md-6" >
                        <h1 className="app-title bolder alignleft">
                            the mutz hub.
                        </h1>
                        You don't need to register to
                        <Link to="/">
                            <span className="button bolder shmargin mhpadding">
                                make an order
                            </span>
                        </Link>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-6 nopadding">
                        <ValidationHandler
                            submit={this.submit}
                            fieldDisplay={fieldDisplay}
                            validation={validation}
                            form = {form}>
                            <RegisterForm
                                location={location.state}
                                loading={this.state.loading}/>
                        </ValidationHandler>
                    </div>
                </div>
            </div>
        )
    }
}
