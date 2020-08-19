import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
import {
    GET,
    POST,
    PUT
} from '../../utils/api';

export const configuracionHandlers = {
    list: [
        {
            endpoint:'/escritorio/configuracion',
            match:/\/escritorio\/configuracion$/,
            callback:({params,user}) =>
                configuracionHandler(`usuario/local/${user.id}`,'/escritorio/configuracion')
        },
        {
            endpoint:'/escritorio/configuracion/usuario',
            match:/\/escritorio\/configuracion\/(usuario)$/,
            callback:({params,user}) =>
                usuarioHandler(`usuario/local/${user.id}`,'/escritorio/configuracion/usuario')
        },
        {
            endpoint:'/escritorio/configuracion/establecimiento',
            match:/\/escritorio\/configuracion\/(establecimiento)$/,
            callback:({params,user}) =>
                establecimientoHandler(`usuario/local/${user.id}`,'/escritorio/configuracion/establecimiento')
        },
        {
            endpoint:'/escritorio/configuracion/reservas',
            match: /\/escritorio\/configuracion\/(reservas)$/,
            callback: ({params,user}) =>
                reservaHandler(`usuario/local/${user.id}`,'/escritorio/configuracion/reservas')
        }
    ],
    form: {
        establecimiento:sendEstablecimientoPutRequest,
        reservas:sendReservasPutRequest,
        usuario:sendUsuarioPutRequest
    }
};



const establecimientoHandler = (endpoint) => {
    return function () {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });

        return request
            .then(
                response => {
                    this.setState({
                        data: response.data.data,
                        loadFinished:true,
                        location: this.props.location
                    });
                }
            );
    }
}

const configuracionHandler = (endpoint) => {
    return function () {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });

        return request
            .then(
                response => {
                    this.setState({
                        data: response.data.data,
                        loadFinished:true,
                        location: this.props.location
                    });
                }
            )
    }
}

const reservaHandler = (endpoint) => {
    return function (){
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });

        return request
            .then(
                response => {
                    this.setState({
                        data: response.data.data,
                        loadFinished:true,
                        location: this.props.location
                    });
                }
            )
    }
}


const usuarioHandler = (endpoint) => {
    return function (){
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });

        return request
            .then(
                response => {
                    this.setState({
                        data: response.data.data,
                        loadFinished:true,
                        location: this.props.location
                    });
                }
            )
    }
}

export function sendEstablecimientoPutRequest (data) {
    return PUT({
        endpoint: 'usuario/update/establecimiento',
        data: JSON.stringify(data)
    });
}

export function  sendReservasPutRequest(data) {
    return PUT({
        endpoint: 'usuario/update/reservas',
        data: JSON.stringify(data)
    });
}

export function sendUsuarioPutRequest (data) {
    return PUT({
        endpoint: 'usuario/update/usuario',
        data: JSON.stringify(data)
    });
}
