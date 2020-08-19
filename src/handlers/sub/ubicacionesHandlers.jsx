import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
import {
    GET,
    POST,
    PUT
} from '../../utils/api';

export const ubicacionesHandlers = {
    list: [
        {
            endpoint:'/escritorio/ubicaciones',
            match:/\/escritorio\/ubicaciones$/,
            callback:({params,user}) =>
                listHandler(`ubicaciones/list/${user.id}`,`/escritorio/ubicaciones`)
        },
        {
            endpoint:'/escritorio/ubicaciones/agregar',
            match:/\/escritorio\/ubicaciones\/(agregar)$/,
            callback:({params,user}) =>
                addFormHandler(`ubicaciones/single/${user.id}/${params.id}`,`/escritorio/ubicaciones/agregar`)
        },
        {
            endpoint:'/escritorio/ubicaciones/editar/:id',
            match:/\/escritorio\/ubicaciones\/(editar\/\d+)$/,
            callback:({params,user}) =>
                editFormHandler(`ubicaciones/single/${user.id}/${params.id}`,`/escritorio/ubicaciones/editar/${params.id}`)
        },
        {
            endpoint:'/escritorio/ubicaciones/:id',
            match: /\/escritorio\/ubicaciones\/(\d+)$/,
            callback: ({params,user}) =>
                singleHandler(`/ubicaciones/single/${user.id}/${params.id}`,`/escritorio/ubicaciones/${params.id}`)

        }
    ],
    form:{
        add:sendPostRequest,
        edit:sendPutRequest
    }
};

const singleHandler  = (endpoint) => {
    return function () {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });
        return request
            .then(
                response => {
                    const data = response.data.ubicaciones[0];
                    this.setState({
                        data: data,
                        nombre:data.nombre,
                        loadFinished:true,
                        location:this.props.location
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
                            data: response.data.ubicaciones.data,
                            loadFinished:true,
                            location:this.props.location
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
                        const data = response.data.ubicaciones[0];
                        this.setState({
                            data: data,
                            nombre:data.nombre,
                            loadFinished: true,
                            location:this.props.location
                        });
                    }
                )
    }
}

const addFormHandler = (endpoint) => {
    return function () {
        return new Promise ((resolve) => resolve())
            .then (
                this.setState({
                    data: true,
                    loadFinished:true,
                    location:this.props.location
                })
            )
    }
}

export function sendPostRequest (data) {
    return POST({
        endpoint: 'ubicaciones/create',
        data: JSON.stringify(data)
    });
}

export function sendPutRequest (data) {
    return PUT({
        endpoint: 'ubicaciones/update',
        data: JSON.stringify(data)
    });
}
