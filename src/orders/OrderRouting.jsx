import React from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';

import OrderForm from './menu/OrderForm.jsx'
import ShopForm from './shops/ShopForm.jsx'
import Checkout from './checkout/Checkout.jsx'

import DataHandler from '../components/hocs/DataHandler.jsx';

export default React.memo(OrderRouting)

function OrderRouting (props) {
    return (
        <Switch>
            <Route
                path={`${props.match.url}shops`}
                component={
                    (match) => {
                        return (
                            <DataHandler
                                stored={props.stored}
                                endpoint={`/shop/list`}
                                {...match}>
                                <ShopForm
                                    next="/order"/>
                            </DataHandler>
                        )
                    }
                } />
            <Route
                path={`${props.match.url}order/:id`}
                render={
                    (match) =>{
                        return (
                            <DataHandler
                                endpoint={`/menu/${match.match.params.id}`}
                                {...match}>
                                <OrderForm
                                    stored={props.stored}
                                    save={props.save}
                                    display={props.display}
                                    next="/checkout"
                                    prev="/shops"/>
                            </DataHandler>
                        )
                    }
                } />
            <Route
                path={`${props.match.url}checkout`}
                component={
                    (match) =>{
                        return (
                            <DataHandler
                                stored={props.stored}
                                {...match}>
                                <Checkout
                                    toggleItem={props.toggleItem}
                                    back="order"/>
                            </DataHandler>
                        )
                    }
                }/>
        </Switch>
    );
}
