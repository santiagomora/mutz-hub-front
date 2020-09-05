import React, {
    Component
} from 'react';

import ReactDOM from 'react-dom';

import ValidationHandler from '../../../components/hocs/ValidationHandler.jsx';

import RegisterForm from '../../auth/form/RegisterForm.jsx';

import Loader from 'react-loader-spinner';

const validation = {
    cli_password:{
        required:false
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
        alphabetic:true,
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
            loading:false,
            error:false,
            success:false
        }
        const user = props.user
        this.form ={
            cli_address:user.cli_address,
            cli_telephone:user.cli_telephone+"",
            cli_name:user.cli_name,
            cli_email:user.cli_email
        }
        this.submit = this.submit.bind(this);
    }

    submit(form){
        const {user} = this.props;
        if (user)
            this.setState(
                {loading:true},
                this.props.requestHandler({
                    method:'put',
                    options:() => ({
                        url:`/client/update/${user.cli_id}`,
                        data:{
                            cli_id:user.cli_id,
                            ...form
                        }
                    }),
                    onSuccess:(
                        res => {
                            this.setState(
                                {loading:false},
                                () => {
                                    const {msg,success} = res.data,
                                        upd = success
                                            ? {success:msg+'...Refreshing page.',error:false}
                                            : {error:msg+'... Refreshing page.',success:false};
                                        this.setState(
                                            {...upd},
                                            () => setTimeout(
                                                () => this.props.history.go(0),
                                                2000
                                            )
                                        )
                                    }
                                )
                            }
                        ),
                    onError: (err) => console.log(err)
                })
            )
    }

    render(){
        return (
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-md-12 nopadding">
                        <p>fill any of these fields if you want to change your personal information.</p>
                        <div className="lightbox">
                            <RegisterForm
                                profile
                                submit={this.submit}
                                fieldDisplay={fieldDisplay}
                                validation={validation}
                                form = {this.form}
                                loading={this.state.loading}/>
                            <div className="padding">
                                <div className="selected">{this.state.success}</div>
                                <div className="redfont">{this.state.error}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
