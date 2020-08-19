import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
import Titulo from '../app/componentes/basic/Titulo';
import {
     Text
 } from '../app/componentes/input/Text';
import {
    Password
} from '../app/componentes/input/Password'

import ValidationHandler from '../app/hocs/ValidationHandler';

const validation = {
    email: {
        rules:{
            required:true,
            email:true,
            maxLen:100
        },
        fieldName:"Email de usuario"
    },
    password:{
        rules:{
            required:true,
            maxLen:100
        },
        fieldName:"Contraseña"
    }
};


export default function Login (props){
    const fields = {
        email:"",
        password:""
    };
    return (
        !props.auth
        ?
            <div style={{height:"100vh"}}>
                <div className="dark-background" style={{height:"40vh"}}/>
                <div className="container-fluid" style={{marginTop:"-10%"}}>
                    <div className="row relative visible top-padding justify-content-center">
                        <div className="col-md-10 white-background col-lg-6 col-sm-12"
                            style={{
                                padding:"50px",
                                borderRadius:"5px"
                            }}>
                            <ValidationHandler hideCancel
                                form={fields}
                                sendRequest={props.login}
                                validation={validation}
                                sendTitle={{
                                    title:(
                                        <div className="text bold">
                                            <i className="fas fa-paper-plane inline-box side-margin"></i>
                                            Entrar
                                        </div>
                                    )
                                }}>
                                <LoginComponent/>
                            </ValidationHandler>
                        </div>
                    </div>
                </div>
            </div>
        :
            <Redirect to={props.redirect}/>   
    )
}
//
function LoginComponent (props) {
    return (
        <>
            <Titulo title="Login"/>
            <Text rows={1}
                titulo="Email"
                holder="Email de usuario"
                name="email"
                value={props.fields.email}
                changeHandler={props.change}
                errors={props.errors.email}/>
            <div className="top-padding">
                <Password titulo="Password"
                    holder="Contraseña"
                    name="password"
                    value={props.fields.password}
                    changeHandler={props.change}
                    errors={props.errors.password}/>
            </div>
        </>
    );
}
