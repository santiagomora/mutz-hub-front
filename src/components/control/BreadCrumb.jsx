import React, {
    Component
} from 'react';
import {
    Link
} from 'react-router-dom';
import {
    OrderBanner
} from '../control/OrderVisualization.jsx';

import ConditionalRender from '../composition/ConditionalRender.jsx';

const crumbs = {
    shops:{
        section:"shops",
        reg:/\//,
        title: (paint) => (
            <>
                <h3 className={`subalign iblock shmargin ${paint}`}>
                    1.
                </h3>
                    Choose your shop
            </>
        ),
        link:(id) => "/",
        width:"34%",
        paint:["shops"]
    },
    menu:{
        section:"menu",
        reg:/\/menu\/[0-9]+/,
        title:(paint) => (
            <>
                <h3 className={`subalign iblock shmargin ${paint}`}>
                    2.
                </h3>
                Take a look at the menu
            </>
        ),
        link:(id) => `/menu/${id}`,
        width:"67%",
        paint:["shops","menu"]
    },
    checkout: {
        section:"checkout",
        reg:/\/checkout/,
        title:(paint) => (
            <>
                <h3 className={`subalign iblock shmargin ${paint}`}>
                    3.
                </h3>
                Verify your order
            </>
        ),
        link:(id) => "/checkout",
        width:"100%",
        paint:["shops","menu","checkout"]
    }
};

const getCrumbs =
    current => Object.values(crumbs).map(
        e => !current.match( e.reg ) ? {disable:true,...e} : e
    );

export default function BreadCrumb({
    hideBanner,
    location,
    current,
    state,
    toggleItem,
    toggleModal,
    removeItem
}){
    let stored = '';
    const items = getCrumbs(current),
        curr = crumbs[current]||{},
        order = state.order||{},
        hasOrder = (order.items||[]).length>0;

    return (
        <div className="container-fluid">
            <div className="row">
                {
                    items.map(
                        (e,i) => {
                            const isEnabled = (curr.paint||[]).indexOf(e.section) === -1,
                                paint = hasOrder||!isEnabled
                                    ? "selected bolder"
                                    : "disabled bolder"
                            return (
                                <div
                                    key={i}
                                    className="col-md-3">
                                {
                                    hasOrder||!isEnabled
                                    ?
                                        <Link to={{
                                            pathname:e.link((state.shop||{}).id)
                                        }}>
                                            <span className={paint}>
                                                {e.title(paint)}
                                            </span>
                                        </Link>
                                    :
                                        <>
                                            <span
                                                className={paint}>
                                                {e.title(paint)}
                                            </span>
                                        </>
                                }
                                </div>
                            );
                        }
                    )
                }
                <ConditionalRender
                    condition={hideBanner}
                    other={<></>}>
                    <OrderBanner
                        state={state}
                        removeItem={removeItem}
                        toggleModal={toggleModal}
                        toggleItem={toggleItem}/>
                </ConditionalRender>
            </div>
        </div>
    );
}
