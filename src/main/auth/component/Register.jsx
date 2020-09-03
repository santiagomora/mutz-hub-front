import React, {
    Component
} from 'react';
import {
    Link
} from 'react-router-dom';

import RegisterForm from '../form/RegisterForm.jsx';

import RequestHandler from '../../../components/hocs/RequestHandler.jsx';

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
        max:50,
        alphabetic:true
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

class Register extends Component {

    constructor(props){
        super(props);
        this.state = {
            loading:false
        }
        this.submit = this.submit.bind(this);
    }

    submit(form){
        this.setState(
            {loading:true},
            this.props.requestHandler({
                method:'post',
                options:() => ({
                    url:"/auth/client/register",
                    data:form
                }),
                onSuccess:(
                    res => {
                        this.setState(
                            {loading:false},
                            () => {
                                const {user} = res.data;
                                if (user)
                                    this.props.authenticate(
                                        user,
                                        () => this.props.history.push('/dashboard')
                                    );
                            }
                        )
                    }
                ),
                onError: (err) => {
                    this.setState({
                        loading:false,
                        error:"invalid data"
                    })
                }
            })
        )
    }

    render(){
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
                        <RegisterForm
                            submit={this.submit}
                            fieldDisplay={fieldDisplay}
                            validation={validation}
                            form = {form}
                            loading={this.state.loading}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default RequestHandler( Register );
