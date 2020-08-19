import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
import {
    GET,
    POST,
    PUT
} from '../../utils/api';

export const promocionesHandlers = {
    list: [
        {
            endpoint:'/escritorio/promociones',
            match:/\/escritorio\/promociones$/,
            callback:({params,user}) =>
                listHandler(`promociones/list/${user.id}`,`/escritorio/promociones`)
        },
        {
            endpoint:'/escritorio/promociones/agregar',
            match:/\/escritorio\/promociones\/(agregar)$/,
            callback:({params,user}) =>
                addFormHandler(`promociones/add/${user.id}`,`/escritorio/promociones/agregar`)
        },
        {
            endpoint:'/escritorio/promociones/editar/:id',
            match:/\/escritorio\/promociones\/(editar\/\d+)$/,
            callback:({params,user}) =>
                editFormHandler(`promociones/single/27/${params.id}`,`/escritorio/promociones/editar/${params.id}`)
        },
        {
            endpoint:'/escritorio/promociones/:id',
            match: /\/escritorio\/promociones\/(\d+)$/,
            callback: ({params,user}) =>
                singleHandler(`/promociones/single/${user.id}/${params.id}`,`/escritorio/promociones/${params.id}`)
        }
    ],
    form: {
        add:sendPostRequest,
        edit:sendPutRequest,
        update:updateScope
    }
};


const singleHandler = (endpoint) => {
    return function () {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });
        return  request
                .then(
                    response => {
                        const data = response.data.promociones[0];
                        this.setState({
                            data: data,
                            nombre:data.nombre,
                            loadFinished: true,
                            location:this.props.location,
                        });
                    }
                )
    }
}


const listHandler = (endpoint) => {
    return function () {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });

        return  request
                .then(
                    response => {
                        this.setState({
                            data: response.data.promociones.data,
                            loadFinished: true,
                            location:this.props.location,
                        });
                    }
                )
    }
}


const editFormHandler = (endpoint) => {
    return function () {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });

        return  request
                .then(
                    response => {
                        const data  = response.data.promociones[0];
                        this.setState({
                            data: {
                                selected: data,
                                all: {
                                    eventos: response.data.eventos
                                }
                            },
                            nombre:data.nombre,
                            loadFinished: true,
                            location:this.props.location,
                        });
                    }
                )
    }
}

const addFormHandler = (endpoint) => {
    return function () {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });
        return  request
                .then(
                    response => {
                        this.setState({
                            data: { ...response.data },
                            loadFinished: true,
                            location:this.props.location,
                        });
                    }
                )
    }
}

export function sendPostRequest (data) {
    return POST({
        endpoint: 'promociones/create',
        data: JSON.stringify(data)
    });
}

export function sendPutRequest (data) {
    return PUT({
        endpoint: 'promociones/update',
        data: JSON.stringify(data)
    });
}

export function updateScope () { }
