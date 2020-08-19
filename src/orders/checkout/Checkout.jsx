import React, {
    Component,
    useContext
} from 'react';
import ReactDOM from 'react-dom';

import {OrderPreview} from '../../components/hocs/OrderVisualization.jsx';
import CheckoutForm from './form/CheckoutForm.jsx';
import {ExchangeContext} from '../../components/hocs/OrderHandler.jsx';

export default function Checkout (props) {
    const rate = useContext( ExchangeContext ),
        loc = props.location.state||{},
        order = loc.order,
        curr = loc.curr;
    return (
        <div className="container-fluid mvpadding">
            <div className="row">
                <div className="col-md-6"  style={{height:"70vh",overflowY:"scroll"}}>
                    <OrderPreview
                        toggleItem={props.toggleItem}
                        curr={curr}
                        rate={rate}
                        order={order}/>
                </div>
                <div className="col-md-6">
                    <h4 className="bolder">Almost there!</h4>
                    <CheckoutForm order={order}/>
                </div>
            </div>
        </div>
    )
}
