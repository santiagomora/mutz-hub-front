import React,{
    Component,
    useContext,
    useState
} from 'react';
import {
    Redirect,
    Link
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

import SectionTitle from '../../components/control/SectionTitle.jsx';

function Dashboard( props ){
    const {data,requestHandler,change,shop,order,convert} = props,
        {items} = order||{},
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
        <div className="container-fluid">
            <SectionTitle
                title={`Welcome back!`}
                iconurl={'/img/dashboard.png'}
                description={`${user.cli_name}'s personal account.`}/>
            <div className="row">
                <div className="col-md-12 mtpadding">
                    <TableSection
                        data={data} />
                </div>
            </div>
            <div className="row mtpadding">
                <div className="col-md-6 mbpadding">
                    <h3 className="bolder">Personal information</h3>
                    <Profile
                        history={props.history}
                        requestHandler={props.requestHandler}
                        user={user}/>
                </div>
                <div className="col-md-6">
                    <h3 className="bolder">Current order</h3>
                    <OrderPreview
                        removeItem={props.removeItem}
                        state={{change,shop,order,convert}}
                        toggleItem={props.toggleItem}/>
                    {
                        (items||[]).length<=0
                        ?
                            <div className="alignright">
                                <Link to="/" className="iblock fifty">
                                    <div className="button bolder aligncenter greenback">
                                        Go to shops!
                                    </div>
                                </Link>
                            </div>
                        : <></>
                    }
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
