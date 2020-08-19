import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
import {
    GET,
    POST,
    PUT
} from '../../utils/api';
import {generateHoursFromInterval} from '../../utils/Helper';

export const feriadosHandlers = {
    list:[
        {
            endpoint:`/escritorio/feriados`,
            match:/(\/escritorio\/feriados)$/,
            callback:({params,user}) =>
                listHandler(`/feriados/list/${user.id}`)
        },
        {
            endpoint:`/escritorio/feriados/agregar`,
            match:/(\/escritorio\/feriados\/agregar)$/,
            callback:({params,user}) =>
                addFormHandler(`/feriados/add/${user.id}/`)
        },
        {
            endpoint:`/escritorio/feriados/editar/:id`,
            match:/\/escritorio\/(feriados\/editar\/\d+)$/,
            callback:({params,user}) =>
                editFormHandler(`/feriados/single/${user.id}/${params.id}`)
        },
        {
            endpoint:`/escritorio/feriados/:id`,
            match: /\/escritorio\/feriados\/(\d+)$/,
            callback: ({params,user}) =>
                singleHandler(`/feriados/single/${user.id}/${params.id}`)
        }
    ],
    form: {
        add:sendPostRequest,
        edit:sendPutRequest
    }
};

const editFormHandler = (endpoint) => {
    return function (){
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });
        return request
            .then(
                response => {
                    const data = response.data.feriados[0];
                    this.setState({
                        data: {
                            date: new Date(response.data.feriados[0].fecha),
                            feriados: data,
                            eventos: response.data.eventos,
                            minutes: generateHoursFromInterval(response.data.intervalo),
                            side: response.data.feriados[0].estado === 'laboral'
                        },
                        nombre:data.nombre,
                        loadFinished: true,
                        location:this.props.location
                    });
                }
            )
    }
}

const addFormHandler = (endpoint) => {
    return function (params) {
        const   date = (params||{}).date||new Date(),
                request = GET({
                    endpoint: `${endpoint}${parseInt(date.getMonth()+1)}/${date.getFullYear()}`,
                    download: this.downloadHandler
                });
        if (params) {
            this.props.history.replace({
                state:{
                    ...this.props.location.state||{},
                    date:date,
                    show:params.show
                }
            })
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
                                data: {
                                    date: date,
                                    feriados: response.data.feriados.list,
                                    eventos: response.data.eventos,
                                    minutes: generateHoursFromInterval(response.data.intervalo),
                                },
                                loadFinished: true,
                                location:this.props.location
                            });
                        }
                    )
                );
        }
        return  request
            .then(
                response => {
                    this.setState({
                        data: {
                            date: date,
                            feriados: response.data.feriados.list,
                            eventos: response.data.eventos,
                            minutes: generateHoursFromInterval(response.data.intervalo),
                        },
                        loadFinished: true,
                        location:this.props.location
                    });
                }
            )

    }
}


const listType = {
    agenda:{
        request:(
            endpoint,
            date,
            download
        ) => ({
            endpoint: `${endpoint}/${parseInt(date.getMonth()+1)}/${date.getFullYear()}`,
            download
        }),
        resolve:({
            date,
            location,
            response
        }) => ({
            data:{
                date:date,
                data: response.data.feriados.data||{},
                intervalo: response.data.intervalo,
                type:'agenda'
            },
            loadFinished:true,
            location
        })
    },
    tabla:{
        request:(
            endpoint,
            date,
            download
        ) => ({
            endpoint: `${endpoint}/all`,
            download
        }),
        resolve:({
            location,
            response
        }) => ({
            data:{
                data:Object.values(response.data.feriados.data),
                type:'tabla'
            },
            location,
            loadFinished:true,
        })
    }
};

const listHandler = (endpoint) => {
    return function (params) {
        const date = (params||{}).date||new Date(),
            loc = (this.props.location||{}).state||{},
            type = params.type||loc.type||'agenda',
            conf = listType[type],
            request = GET(
                conf.request(
                    endpoint,
                    date,
                    this.downloadHandler
                )
            );
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
                            this.setState(
                                conf.resolve({
                                    date: new Date(date),
                                    location:this.props.location,
                                    response
                                }),
                                () => {
                                    this.props.history.replace({
                                        state:{
                                            ...loc,
                                            date,
                                            type
                                        }
                                    });
                                }
                            );
                        }
                    )
                )
        }
};

const singleHandler = (endpoint) => {
    return function (){
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });

        return request
            .then(
                response => {
                    const data = response.data.feriados[0];
                    this.setState({
                        data: {
                            data:data,
                            eventos:response.data.eventos,
                            intervalo:response.data.intervalo
                        },
                        nombre:data.nombre,
                        location:this.props.location,
                        loadFinished:true
                    });
                }
            )
    }
}

export function sendPostRequest (data) {
    return POST({
        endpoint: 'feriados/create',
        data: JSON.stringify(data)
    });
}

export function sendPutRequest (data) {
    return PUT({
        endpoint: 'feriados/update',
        data: JSON.stringify(data)
    });
}
