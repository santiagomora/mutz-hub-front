import React,{
    useContext
} from 'react';
import {
    Route,
    Switch,
    withRouter
} from 'react-router-dom';
import{
    storage
} from '../../helper/helperIndex.jsx';

import Protected from '../../components/composition/Protected.jsx';

import OrderForm from './menu/OrderForm.jsx'

import ShopForm from './shops/ShopForm.jsx'

import Checkout from './checkout/Checkout.jsx'

import OrderHandler from '../../components/hocs/OrderHandler.jsx';

import HeaderHandler from '../../components/hocs/HeaderHandler.jsx';

import NotFound from '../../components/NotFound.jsx';

import Footer from '../Footer.jsx';

function OrderRouting (props) {
    return (
        <Switch>
            <Route
                exact
                path={`${props.match.url}`}
                render={
                    (match) => (
                        <ShopForm
                            {...match}
                            {...props}
                            requestOnMount/>
                    )
                } />
            <Route
                exact
                path={`${props.match.url}menu/:id`}
                render={
                    ({match}) => (
                        <Protected
                            redirect="/"
                            condition={!storage.get('shop')}>
                            <OrderForm
                                {...match}
                                {...props}
                                params={match.params}
                                requestOnMount/>
                        </Protected>
                    )
                } />
            <Route
                exact
                path={`${props.match.url}checkout`}
                render={
                    (match) =>{
                        return (
                            <Checkout
                                {...match}
                                {...props}
                                showButton={false}
                                toggleItem={props.toggleItem}
                                requestOnMount={false}/>
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

export default HeaderHandler( OrderHandler( OrderRouting ) );
