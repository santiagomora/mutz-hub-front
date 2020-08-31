import React, {
    Component,
    useState
} from 'react';
import{
    Link
} from 'react-router-dom';

import RequestHandler from '../../../components/hocs/RequestHandler.jsx';

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

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            loading:false,
            error:null
        }
        this.submit = this.submit.bind(this);
    }

    submit(form){
        this.setState(
            {loading:true},
            this.props.requestHandler({
                method:'post',
                options:() => ({
                    url:"/auth/client/login",
                    data:form
                }),
                onSuccess:(
                    res => {
                        this.setState(
                            {loading:false},
                            () => {
                                const {user} = res.data;
                                if (user){
                                    this.props.authenticate(
                                        user,
                                        () => this.props.history.push('/dashboard')
                                    );
                                }
                            }
                        )
                    }
                ),
                onError: (err) => {
                    this.setState({
                        loading:false,
                        error:"invalid email or password."
                    })
                }
            })
        )
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
                        <LoginForm
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

export default RequestHandler( Login );
