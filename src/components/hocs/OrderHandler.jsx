import React, {
    Component,
    useState
} from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';
import {
    Toggle
} from '../../components/input/Toggle.jsx';
import {
    GET
} from '../../components/api.jsx';
import {
    saveHistory
} from '../helper/saveHistory.jsx';
import {
    toggleItem
} from '../helper/toggleItem.jsx';
import {
    checkKeys
} from '../helper/checkKeys.jsx';
import {
    OrderPreview
} from './OrderVisualization.jsx';

import BreadCrumb from '../control/BreadCrumb.jsx';

import ConditionalRender from './ConditionalRender.jsx';

const CURRENCY = ["USD","EUR"];

const sections = {
    shops:"/",
    checkout:"/checkout",
    menu:"/menu"
};

const matchSection =
    (path) => Object.keys( sections ).filter(
        e => path.match(sections[e])
    ).pop();

class OrderHandler extends Component {

    constructor(props){
        super(props);
        this.state={};
        this.displayOrder = this.displayOrder.bind(this);
        this.toggleItem = toggleItem.bind(this);
        this.saveOrder = this.saveOrder.bind(this);
    }

    saveOrder(item){
        const st = this.props.location.state||{},
            shop = st.shop,
            order = st.order||{};
        let ord = ( checkKeys( order ) )
            ? {
                shop:shop,
                items:[item]
            }
            : {
                shop:shop,
                items: (item.item.shop.id === order.shop.id)
                ? [
                    ...order.items,
                    item
                ] : [item]
            };
        this.props.save({name:'order',data:ord})
    }

    displayOrder(){
        const st = this.props.location.state||{},
            display = !(st.display||false);
        this.props.save({name:'display',data:display})
    }

    render(){
        const {location} = this.props,
            {pathname} = location,
            state = location.state||{},
            {
                curr,
                display,
                order,
                change
            } = state,
            hideBanner = pathname.match("checkout");

        return (
            <div className="container-fluid">
                <div className="row">
                    <BreadCrumb
                        hideBanner={hideBanner}
                        location={pathname}
                        current={matchSection(pathname)}
                        state={state}
                        toggleItem={this.toggleItem}
                        displayOrder={this.displayOrder}/>
                </div>
                <div className="row">
                    <div className={
                        display&&!hideBanner
                            ? "col-md-8"
                            : "col-md-12" }
                        style={{margin:"0px"}}>
                        {
                            React.cloneElement(
                                this.props.children,{
                                    orderState:state,
                                    toggleItem:this.toggleItem,
                                    save:this.saveOrder
                                }
                            )
                        }
                    </div>
                    <div  className={
                        display&&!hideBanner
                            ? "col-md-4 mvpadding shadowleft"
                            : "hidden"
                        }>
                        <OrderPreview
                            curr={curr}
                            rate={change}
                            toggleItem={this.toggleItem}
                            state={state}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter( OrderHandler );
