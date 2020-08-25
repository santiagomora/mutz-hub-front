import React, {
    Component
} from 'react';
import {
    register
} from '../../auth/Handlers.jsx';
import {
    POST
} from '../../../components/api.jsx';

import ReactDOM from 'react-dom';

import ValidationHandler from '../../../components/hocs/ValidationHandler.jsx';

import RegisterForm from '../../auth/form/RegisterForm.jsx';

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

export default class Profile extends Component {

    constructor(props){
        super(props);
        this.state = {
            loading:false
        }
        this.submit = register.bind(this);
        const user = props.user
        this.form ={
            cli_address:user.cli_address,
            cli_telephone:user.cli_telephone,
            cli_name:user.cli_name,
            cli_email:user.cli_email,
            cli_password:user.cli_password,
            cli_email:user.cli_email
        }
    }

    render(){
        const {location} = this.props
        return (
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-md-12 nopadding">
                        <p>fill any of these fields if you want to change your personal information.</p>
                        <ValidationHandler
                            submit={this.submit}
                            fieldDisplay={fieldDisplay}
                            validation={validation}
                            form = {this.form}>
                            <RegisterForm
                                profile
                                location={location.state}
                                loading={this.state.loading}/>
                        </ValidationHandler>
                    </div>
                </div>
            </div>
        )
    }
}
