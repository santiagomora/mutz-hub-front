import React, {
    useState
} from 'react';
import {
    Toggle
} from '../../components/input/Toggle.jsx';
import {
    checkKeys,
    round,
    saveHistory
} from '../../helper/helperIndex.jsx';
import {
    Link
} from 'react-router-dom';

import LoadingComponent from '../composition/LoadingComponent.jsx';

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
    let {convert,order,change} = state,
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
        cName = change.tag,
        shopCurr = shop.currency;
    return(
        <div>
            <h4 className="bolder sbmargin">{shop.name}</h4>
            <div className="greenline"></div>
            <div className="ordercont mrpadding">
                {
                    items.map(
                        (e,i) => {
                            const item = e.item.data,
                                quant = e.quantity,
                                varKeys = Object.keys(e.variations);
                            let itemTotal = item.base_price;
                            const elem = (
                                <div key={i}>
                                    <div className="stmargin">
                                        <h5 className="bolder" style={{color:"var(--outline)"}}>
                                            {item.name}
                                            <span className="shmargin bolder">
                                                &#10799;{quant}
                                            </span>
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
                                        <span className="bolder">
                                            {order.shop.name},
                                        </span>
                                        <span className="selected shmargin">
                                            {item.category}
                                        </span>
                                        <p>
                                            {item.description}
                                        </p>
                                    </div>
                                    <div>
                                    {
                                        varKeys.length>0
                                        ?
                                        <>
                                            <h5 className="bolder">Variations.</h5>
                                            {
                                                varKeys.map(
                                                (va,k) => {
                                                    const vr = e.variations[va];
                                                    itemTotal+=vr.price;
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
                                                                price={convert(shopCurr,vr.price)}
                                                                quant={quant}
                                                                cName={cName}/>
                                                        </div>
                                                    )
                                                }
                                            )
                                        }
                                        </>
                                        : <></>
                                    }
                                    </div>
                                    <div>
                                    {
                                        e.extras.length>0
                                        ?
                                        <>
                                            <h5 className="bolder">Extra ingredients.</h5>
                                            {
                                                e.extras.map(
                                                    (ex,j) => {
                                                        itemTotal+=ex.price;
                                                        return (
                                                            <div key={j} className="wfull">
                                                                <DisplayRow
                                                                    name={ex.name}
                                                                    price={convert(shopCurr,ex.price)}
                                                                    quant={e.quantity}
                                                                    cName={cName}/>
                                                            </div>
                                                        )
                                                    }
                                                )
                                            }
                                        </>
                                        : <></>
                                    }
                                    </div>
                                    <div>
                                        <DisplayRow
                                            name={<span className="bolder">base price:</span>}
                                            price={convert(shopCurr,item.base_price)}
                                            quant={e.quantity}
                                            cName={cName}/>
                                    </div>
                                    <h5 className="alignright iblock wfull">
                                        <span className="iblock bolder">Item total...:</span>
                                        <span className="shmargin iblock">{convert(shopCurr,itemTotal*e.quantity)}</span>
                                        <span className="selected">{cName}</span>
                                    </h5>
                                </div>
                            );
                            orderTotal+=(itemTotal*e.quantity);
                            return elem;
                        }
                    )
                }
            </div>
            <div className="wfull grayline"></div>
            <h6 className="alignright iblock wfull stpadding sbmargin">
                <span className="iblock bolder shmargin">Shipping fee...:</span>
                <span className="bolder">+</span>
                <span className="iblock">{convert(shopCurr,shop.shipping)}</span>
                <span className="selected">{cName}</span>
            </h6>
            <h5 className="alignright iblock wfull">
                <span className="iblock bolder">Order total...:</span>
                <span className="shmargin iblock">{convert(shopCurr,orderTotal+shop.shipping)}</span>
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
    toggleItem,
    state,
    hideBanner,
    toggleModal
}){
    const [showHover,toggleHover] = useState(false),
        toggleH = e => {
            e.preventDefault();
            toggleHover(!showHover);
        };
    return (
        <div
            onMouseEnter={toggleH}
            onMouseLeave={toggleH}
            className="iblock wfull "
            style={{position:"relative"}}>
            <button
                onClick={toggleModal}
                className="wfull button bolder d-md-none mtmargin">
                your order
            </button>
            <button
                className="button bolder d-none d-md-inline-block">
                your order
            </button>
            <div className={
                showHover&&!hideBanner
                    ? "absolute wfull"
                    : "hidden"}>
                <div className="relative" style={{right:"-80%"}}>
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
