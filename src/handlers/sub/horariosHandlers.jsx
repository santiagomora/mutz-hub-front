import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
import {
    GET,
    POST,
    PUT
} from '../../utils/api';
import {generateHoursFromInterval} from '../../utils/Helper';
import {DAYS} from '../../constantes/DaysMonths';

export const horariosHandlers = {
    list:[
        {
            endpoint:'/escritorio/horarios',
            match:/\/escritorio\/horarios$/,
            callback:({params,user}) =>
                listHandler(`/horarios/list/${user.id}`,`/escritorio/horarios`)
        },
        {
            endpoint:'/escritorio/horarios/agregar/:day',
            match:/\/escritorio\/horarios\/(agregar\/\d+)$/,
            callback:({params,user}) =>
                addFormHandler(`/horarios/add/${user.id}`,`/escritorio/horarios/agregar/${params.day}`)
        },
        {
            endpoint:'/escritorio/horarios/editar/:id',
            match:/\/escritorio\/horarios\/(editar\/\d+)$/,
            callback:({params,user}) =>
                editFormHandler(`/horarios/single/${user.id}/${params.id}`,`/escritorio/horarios/editar/${params.id}`)
        },
        {
            endpoint:'/escritorio/horarios/:id',
            match: /\/escritorio\/horarios\/(\d+)$/,
            callback: ({params,user}) =>
                singleHandler(`/horarios/single/${user.id}/${params.id}`,`/escritorio/horarios/${params.id}`)
        }
    ],
    form: {
        add:sendPostRequest,
        edit:sendPutRequest,
    }
};

const editFormHandler = (endpoint) => {
    return function () {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });
        return  request
                .then(
                    response => {
                        const data = response.data.horarios[0],
                            nombre = DAYS[parseInt(data.diaSemana)-1];
                        this.setState({
                            data:{
                                horarios:data,
                                eventos:response.data.eventos,
                                minutes: generateHoursFromInterval(response.data.intervalo),
                                side: response.data.horarios[0].estado === 'laboral'
                            },
                            nombre:`Horario del ${nombre}`,
                            location:this.props.location,
                            loadFinished: true
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
                            data:{
                                horarios: null,
                                eventos: response.data.eventos,
                                minutes: generateHoursFromInterval(response.data.intervalo)
                            },
                            location:this.props.location,
                            loadFinished: true
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
                            data: response.data.horarios.data,
                            location:this.props.location,
                            loadFinished:true
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

        return  request
                .then(
                    response => {
                        const data = response.data.horarios[0],
                            nombre = DAYS[parseInt(data.diaSemana)-1];
                        this.setState({
                            data: data,
                            nombre:`Horario del ${nombre}`,
                            location:this.props.location,
                            loadFinished:true
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
