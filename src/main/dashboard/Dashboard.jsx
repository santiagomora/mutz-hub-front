import React,{
    Component,
    useContext,
    useState
} from 'react';
import {
    Redirect
} from 'react-router-dom';
import {
    OrderPreview
} from '../../components/control/OrderVisualization.jsx'
import {
    storage
} from '../../helper/helperIndex.jsx';

import AuthUser from '../../context/AuthUser.jsx';

import LoadingComponent from '../../components/composition/LoadingComponent.jsx'

import Profile from './sections/Profile.jsx'

import TableSection from './sections/TableSection.jsx'

import RequestHandler from '../../components/hocs/RequestHandler.jsx';

function Dashboard( props ){
    const {data,requestHandler,change,shop,order,convert} = props,
        {user} = useContext( AuthUser ),
        updateUser = (form) => requestHandler({
            method:'put',
            options:() => ({
                url:`/client/update/${user.cli_id}`,
                data:form,
            }),
            onSuccess: res => console.log(res),
            onError: (err) => console.log(err)
        });
    return (
        <div className="container-fluid nopadding">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="bolder iblock">Dashboard</h1>
                </div>
            </div>
            <div className="row">
                <LoadingComponent
                    data={data}>
                    <div className="col-md-12">
                        <TableSection
                            data={data} />
                    </div>
                </LoadingComponent>
            </div>
            <div className="row mtpadding">
                <div className="col-md-7">
                    <h3 className="bolder">Personal information</h3>
                    <Profile
                        history={props.history}
                        requestHandler={props.requestHandler}
                        user={user}/>
                </div>
                <div className="col-md-5 nopadding">
                    <h3 className="bolder">Current order</h3>
                        <OrderPreview
                            state={{change,shop,order,convert}}
                            toggleItem={props.toggleItem}/>
                </div>
            </div>
        </div>
    );
}

export default RequestHandler(
    Dashboard, {
    options: ({id}) =>({
        url:`/order/list/client/${id}`
    }),
    method:'get'
});
