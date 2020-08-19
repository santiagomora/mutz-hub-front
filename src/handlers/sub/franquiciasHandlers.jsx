import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
import {
    GET,
    POST,
    PUT
} from '../../utils/api';

export const franquiciasHandlers = {
    list:[
        {
            endpoint:'/escritorio/franquicias',
            match:/\/franquicias$/,
            callback:({params,user}) =>
                listHandler(`/usuario/franquicias/${user.id}`,`/escritorio/franquicias`)
        },
        {
            endpoint:'/escritorio/franquicias/agregar',
            match:/\/franquicias\/(agregar)$/,
            callback:({params,user}) =>
                addFormHandler(``,`/franquicias/agregar`)
        },
        {
            endpoint:'/escritorio/franquicias/editar/:id',
            match:/\/escritorio\/franquicias\/(editar\/\d+)$/,
            callback:({params,user}) =>
                editFormHandler(`/usuario/franquicia/${params.id}`,`/escritorio/franquicias/editar/${params.id}`)
        },
        {
            endpoint:'/escritorio/franquicias/:id',
            match: /\/franquicias\/(\d+)$/,
            callback: ({params,user}) =>
                singleHandler(`/usuario/franquicia/${params.id}`,`/escritorio/franquicias/${params.id}`)
        }
    ],
    form: {
        add:sendPostRequest,
        edit:sendPutRequest
    }
};

const editFormHandler = (endpoint) => {
    return function () {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });
        return request
            .then(
                response => {
                    const data = response.data.data;
                    this.setState({
                        data: data,
                        loadFinished:true,
                        nombre:data.nombre,
                        location:this.props.location,
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
                    data:true,
                    loadFinished:true,
                    loading:100,
                    location:this.props.location
                })
            );
    }
}


const listHandler = (endpoint) => {
    return function () {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });
        return request
            .then(
                response => {
                    this.setState({
                        data: response.data.usuarios.data,
                        loadFinished:true,
                        location:this.props.location,
                    });
                }
            )
    }
}

const singleHandler = (endpoint) => {
    return function () {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });

        return request
            .then(
                response => {
                    const data = response.data.data
                    this.setState({
                        data: data,
                        nombre:data.nombre,
                        loadFinished:true,
                        location:this.props.location,
                    });
                }
            )
    }
}


export function sendPostRequest (data) {
    return POST({
        endpoint: 'franquicias/create',
        data: JSON.stringify(data)
    });
}

export function sendPutRequest (data) {
    return PUT({
        endpoint: 'franquicias/update',
        data: JSON.stringify(data)
    });
}
