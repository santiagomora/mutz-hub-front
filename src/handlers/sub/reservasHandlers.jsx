import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
import {
    GET,
    POST,
    PUT
} from '../../utils/api';
import {processData} from '../../utils/Helper';

export const reservasHandlers = {
    list: [
        {
            endpoint:'/escritorio/reservas',
            match:/\/reservas$/,
            callback:({params,user}) =>
                listHandler(`reservas/list/${user.id}`)
        },
        {
            endpoint:'/escritorio/reservas/agregar',
            match:/\/reservas\/(agregar)$/,
            callback:({params,user}) =>
                formHandler(`reservas/add/${user.id}/`)
        },
        {
            endpoint:'/escritorio/reservas/:id',
            match: /\/reservas\/(\d+)$/,
            callback: ({params,user}) =>
                singleHandler(`/reservas/single/${user.id}/${params.id}`)
        }
    ],
    form: {
        add:sendPostRequest,
        edit:sendPutRequest,
        update:updateScope
    }
};

const listHandler = (endpoint) => {

    return function (params) {
        const date = (params||{}).date||new Date(),
            loc = (this.props.location||{}).state||{},
            request = GET({
                endpoint: `${endpoint}/all`,
                download: this.downloadHandler
            });
            return new Promise(
                    (resolve,reject) => {
                        this.setState({
                                loadFinished:false,
                                loading:0
                            },
                            () => resolve()
                        )
                    }
                )
                .then (
                    request
                    .then(
                        response => {
                            this.setState({
                                    data:{
                                        data:processData(response.data.reservas.data),
                                        type:'tabla'
                                    },
                                    location:this.props.location,
                                    loadFinished:true,
                                },
                                () => {
                                    this.props.history.replace({
                                        state:{
                                            ...loc,
                                            first:true,
                                            date,
                                            type:'tabla'
                                        }
                                    });
                                }
                            );
                        }
                    )
                )
        }
}


const singleHandler = (endpoint) => {
    return function () {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });
        return  request
                .then(
                    response => {
                        const data = response.data.reservas[0];
                        this.setState({
                            data: data,
                            nombre:`Reserva de ${data.nombre} ${data.apellido}`,
                            loadFinished:true,
                            location:this.props.location,
                        });
                    }
                )
    }
}


const formHandler = (endpoint) => {
    return function (params) {
        const   date = (params||{}).date||new Date(),
                request = GET({
                    endpoint: `${endpoint}${parseInt(date.getMonth() + 1)}/${date.getFullYear()}`,
                    download: this.downloadHandler
                });
        if (params) {
            this.props.history.replace({
                state:{
                    ...this.props.location.state||{},
                    date:date
                }
            })
            return  new Promise(
                        (resolve,reject) => {
                            this.setState({
                                    loadFinished:false,
                                    loading:0
                                },
                                () => resolve()
                            )
                        }
                    )
                    .then (
                        request
                        .then(
                            response => {
                                const data = response.data;
                                this.setState({
                                    data:{
                                        data:data,
                                        date:date
                                    },
                                    loadFinished:true,
                                    location:this.props.location,
                                });
                            }
                        )
                    );
        }
        return  request
                .then(
                    response => {
                        const data = response.data;
                        this.setState({
                            data:{
                                data:data,
                                date:date
                            },
                            loadFinished:true,
                            location:this.props.location,
                        });
                    }
                )
    }
}

export function sendPostRequest (data) {
    return POST({
        endpoint: 'reservas/create',
        data: JSON.stringify(data)
    });
}

export function sendPutRequest (data) {
    return PUT({
        endpoint: 'reservas/update',
        data: JSON.stringify(data)
    });
}

export function updateScope () { }
