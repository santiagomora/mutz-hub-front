import React, {
    Component,
    useState
} from 'react';
import {
    Link
} from 'react-router-dom';
import {
    Toggle
} from '../../components/input/Toggle.jsx';
import {
    GET
} from '../../components/api.jsx';
import {round} from '../../components/helper/round.jsx';
import LoadingComponent from './LoadingComponent.jsx';
import {saveHistory} from '../helper/saveHistory.jsx';
import BreadCrumb from '../control/BreadCrumb.jsx';

function DisplayRow({va,name,price,quant,cName}){
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

export function OrderPreview({order,toggleItem,rate}){
    let orderTotal=0;
    const cName = rate.names[rate.curr-1],
        shopCurr = order.shop.currency,
        change = ( shopCurr === rate.curr )
            ? 1
            : rate.rate[cName.toLowerCase()];
    return (
        (order.items||{}).length>0
        ?
            <div>
                <h4 className="bolder nomargin">{order.shop.name}</h4>
                <h4 className="bolder nomargin">Your meal:</h4>
                <div className="mvpadding">
                    {
                        order.items.map(
                            (e,i) => {
                                const total = round(e.total*change),
                                    item = e.item,
                                    base = round(item.base_price*change),
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
                                                                p = round(vr.price*change);
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
                                                            const p = round(ex.price*change);
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
                    <h5 className="alignright iblock wfull">
                        <span className="iblock bolder">Order total...:</span>
                        <span className="shmargin iblock">{Math.round(orderTotal*100)/100}</span>
                        <span className="selected">{cName}</span>
                    </h5>
                </div>
            </div>
        :
            <>
                <h5 className="bolder">You have not selected any items... yet!</h5>
                <p>You can start by clicking any shop and then, clicking on any menu item!</p>
            </>
    )
}

export function OrderBanner({
    order,
    display,
    displayOrder,
    curr,
    toggleItem,
    rate
}){
    const [show,toggle] = useState(false),
        toggleShow = e => {
            if (!display)
                toggle(!show);
        }
    return (
        <div
            onMouseEnter={toggleShow}
            onMouseLeave={toggleShow}
            className="iblock smargin"
            style={{position:"relative"}}>
            <button
                onClick={displayOrder}
                className="button bolder">
                Your order
            </button>
            <div className={
                show&&!display
                    ? "absolute wfull"
                    : "hidden"}>
                <div className="relative"
                    style={{left:"40%"}}>
                    <div className="arrowup"></div>
                </div>
                <div className="gborder alignleft mpadding preview relative">
                    <OrderPreview
                        toggleItem={toggleItem}
                        rate={rate}
                        order={order}/>
                </div>
            </div>
        </div>
    )
}
