import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
import {GET} from '../../utils/api';

export const escritorioHandlers = {
    list:[
        {
            endpoint:'/escritorio',
            match:/^\/escritorio$/,
            callback:({params,user}) =>
                escritorioHandler(`reservas/list/${user.id}`)
        }
    ],
    form:{}
};

const escritorioHandler = (endpoint,location) => {
    return function (params) {
        const date = (params||{}).date||new Date(),
            loc = (this.props.location||{}).state||{},
            request = GET({
                endpoint: `/${endpoint}/${parseInt(date.getMonth()+1)}/${date.getFullYear()}`,
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
            ).then (
                request
                .then(
                    response => {
                        this.setState(
                            {
                                data: {
                                    data:response.data.reservas.data,
                                    horarios: {
                                        data:response.data.horarios.data,
                                        intervalo:response.data.intervalo.id,
                                        antelacion: response.data.antelacion,
                                    },
                                    date,
                                    type:'agenda'
                                },
                                location:this.props.location,
                                loadFinished:true
                            },
                            () => {
                                this.props.history.replace({
                                    state:{
                                        ...loc,
                                        first:true,
                                        date,
                                        type:'agenda'
                                    }
                                });
                            }
                        );
                    }
                )
            )
        }
}
