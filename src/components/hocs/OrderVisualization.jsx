import React, {
    Component,
    useState
} from 'react';
import {
    Toggle
} from '../../components/input/Toggle.jsx';
import {
    GET
} from '../../components/api.jsx';
import {
    checkKeys
} from '../../components/helper/checkKeys.jsx';
import {
    round
} from '../../components/helper/round.jsx';
import {
    saveHistory
} from '../helper/saveHistory.jsx';

import Link from '../control/Link.jsx'

import LoadingComponent from './LoadingComponent.jsx';

import BreadCrumb from '../control/BreadCrumb.jsx';

function DisplayRow({
    va,
    name,
    price,
    quant,
    cName
}){
    return(
        <>
            <h6 className="iblock fifty">
                <span>{name}</span>
            </h6>
            <h6 className="alignright iblock fifty">
                <span className="iblock bolder">+</span>
                <span className="iblock">{price}</span>
                <span className="shmargin bolder">&#10799;{quant}</span>
                <span className="selected">{cName}</span>
            </h6>
        </>
    )
}


export function OrderPreview({
    hideButton,
    toggleItem,
    state
}){
    let {order,change} = state,
        len = (order||{}).items||[];
    if ( checkKeys(order||{}) || len <=0 ){
        return (
            <>
                <h5 className="bolder">You have not selected any items... yet!</h5>
                <p>You can start by clicking any shop and then, clicking on any menu item!</p>
            </>
        )
    }
    let {shop,items} = order,
        orderTotal= 0,
        cName = change.names[change.curr-1],
        shopCurr = shop.currency,
        conversion = ( shopCurr === change.curr )
            ? 1
            : change.rate[cName];

    return(
        <div>
            <h4 className="bolder nomargin">{shop.name}</h4>
            <div className="greenline mvmargin"></div>
            <h4 className="bolder nomargin">Your Order:</h4>
            <div className="mvpadding ordercont mrpadding">
                {
                    items.map(
                        (e,i) => {
                            const total = round(e.total*conversion),
                                item = e.item.data,
                                base = round(item.base_price*conversion),
                                quant = e.quantity,
                                varKeys = Object.keys(e.variations);
                            let itemTotal = base*quant;
                            const elem = (
                                <div key={i}>
                                    <div>
                                        <h5 className="bolder" style={{color:"var(--outline)"}}>
                                            {item.name}
                                            <span className="shmargin bolder">&#10799;{quant}</span>
                                            <button
                                                value={-1}
                                                index={i}
                                                className="bolder"
                                                onClick={toggleItem}>
                                                -
                                            </button>
                                            <button
                                                index={i}
                                                value={1}
                                                className="bolder"
                                                onClick={toggleItem}>
                                                +
                                            </button>
                                        </h5>
                                        <span className="bolder">{item.shop.name}, </span>
                                        <span className="selected shmargin">{item.category.name}</span>
                                        <p>{item.description}</p>
                                    </div>
                                    <div>
                                        <h5 className="bolder">Variations.</h5>
                                        {
                                            varKeys.length>0
                                            ?
                                                varKeys.map(
                                                    (va,k) => {
                                                        const vr = e.variations[va],
                                                            p = round(vr.price*conversion);
                                                        itemTotal+=(p*quant);
                                                        return (
                                                            <div key={k} className="wfull">
                                                                <DisplayRow
                                                                    name={
                                                                        <>
                                                                            <span className="bolder">
                                                                                {va}:
                                                                            </span>
                                                                            <span className="shmargin">
                                                                                {vr.var_name}
                                                                            </span>
                                                                        </>
                                                                    }
                                                                    price={p}
                                                                    quant={quant}
                                                                    cName={cName}/>
                                                            </div>
                                                        )
                                                    }
                                                )
                                            : <p>No variations selected.</p>
                                        }
                                    </div>
                                    <div>
                                        <h5 className="bolder">Extra ingredients.</h5>
                                        {
                                            e.extras.length>0
                                            ?
                                                e.extras.map(
                                                    (ex,j) => {
                                                        const p = round(ex.price*conversion);
                                                        itemTotal+=(p*quant);
                                                        return (
                                                            <div key={j} className="wfull">
                                                                <DisplayRow
                                                                    name={ex.name}
                                                                    price={p}
                                                                    quant={e.quantity}
                                                                    cName={cName}/>
                                                            </div>
                                                        )
                                                    }
                                                )
                                            : <p>No extras selected</p>
                                        }
                                    </div>
                                    <div>
                                        <DisplayRow
                                            name={<span className="bolder">base price:</span>}
                                            price={base}
                                            quant={e.quantity}
                                            cName={cName}/>
                                    </div>
                                    <h5 className="alignright iblock wfull">
                                        <span className="iblock bolder">Item total...:</span>
                                        <span className="shmargin iblock">{round(itemTotal)}</span>
                                        <span className="selected">{cName}</span>
                                    </h5>
                                    <div className="wfull mvmargin gborder"></div>

                                </div>
                            );
                            orderTotal+=itemTotal;
                            return elem;
                        }
                    )
                }
            </div>
            <h5 className="alignright iblock wfull mtpadding lrpadding">
                <span className="iblock bolder">Order total...:</span>
                <span className="shmargin iblock">{Math.round(orderTotal*100)/100}</span>
                <span className="selected">{cName}</span>
            </h5>
            {
                hideButton
                ? <></>
                :
                    <Link to="/checkout">
                        <button
                            onClick={()=>false}
                            style={{backgroundColor:"var(--main)"}}
                            className="vmargin button bolder wfull">
                        I'm ready to order!
                        </button>
                    </Link>
            }
        </div>
    )
}

export function OrderBanner({
    displayOrder,
    toggleItem,
    state
}){
    const {display} = state,
        [show,toggle] = useState(false),
        toggleShow = e => {
            e.preventDefault();
            if (!display)
                toggle(!show);
        },
        showOrder = e => {
            e.preventDefault();
            displayOrder();
        };
    return (
        <div
            onMouseEnter={toggleShow}
            onMouseLeave={toggleShow}
            className="iblock smargin"
            style={{position:"relative"}}>
            <button
                onClick={showOrder}
                className="button bolder">
                Your order
            </button>
            <div className={
                show&&!display
                    ? "absolute wfull"
                    : "hidden"}>
                <div className="relative"
                    style={{left:"70%"}}>
                    <div className="arrowup"></div>
                </div>
                <div className="gborder alignleft mpadding preview relative">
                    <OrderPreview
                        toggleItem={toggleItem}
                        state={state}/>
                </div>
            </div>
        </div>
    )
}
