import React from 'react';
import {
    Route,
    Switch,
    withRouter
} from 'react-router-dom';

import OrderForm from './menu/OrderForm.jsx'

import ShopForm from './shops/ShopForm.jsx'

import Checkout from './checkout/Checkout.jsx'

import OrderHandler from '../../components/hocs/OrderHandler.jsx';

import DataHandler from '../../components/hocs/DataHandler.jsx';

import HandleRequest from '../../components/hocs/HandleRequest.jsx';

import NotFound from '../../components/NotFound.jsx';

function OrderRoutes (props) {
    return (
        <Switch>
            <Route
                exact
                path={`${props.match.url}`}
                render={
                    (match) => {
                        return (
                            <HandleRequest>
                                <ShopForm
                                    save={props.save}
                                    orderState={props.orderState}
                                    {...match}/>
                            </HandleRequest>
                        )
                    }
                } />
            <Route
                exact
                path={`${props.match.url}menu/:id`}
                render={
                    (match) =>{
                        return (
                            <HandleRequest>
                                <OrderForm
                                    save={props.save}
                                    orderState={props.orderState}
                                    {...match}/>
                            </HandleRequest>
                        )
                    }
                } />
            <Route
                exact
                path={`${props.match.url}checkout`}
                render={
                    (match) =>{
                        return (
                            <HandleRequest>
                                <Checkout
                                    showButton={false}
                                    toggleItem={props.toggleItem}
                                    {...match}/>
                            </HandleRequest>
                        )
                    }
                }/>
            <Route
                path='*'
                exact={true}
                component={NotFound} />
        </Switch>
    );
}

export default function OrderRouting( props ){
    const Routing = withRouter(OrderRoutes);
    return (
        <OrderHandler {...props}>
            <Routing/>
        </OrderHandler>
    )
}
