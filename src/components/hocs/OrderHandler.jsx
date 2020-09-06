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
    checkKeys,
    storage
} from '../../helper/helperIndex.jsx';
import {
    OrderPreview
} from '../control/OrderVisualization.jsx';

import Modal from '../control/Modal.jsx';

import ExchangeContext from '../../context/ExchangeContext.jsx';

import BreadCrumb from '../control/BreadCrumb.jsx';

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

export default function OrderHandler( Target,hideBanner ){

    return class handler extends Component {

        constructor(props){
            super(props);
            this.state={modal:false};
            this.toggleItem = this.toggleItem.bind(this);
            this.saveOrder = this.saveOrder.bind(this);
            this.store = this.store.bind(this);
            this.removeItem = this.removeItem.bind(this);
            this.toggleModal = this.toggleModal.bind(this);
        }

        static contextType = ExchangeContext;

        store( name,data ){
            const {state} = this;
            state[name] = data;
            this.setState(
                state,
                () => storage.set( name,data )
            );
        }

        toggleItem(e){
            e.preventDefault();
            let item;
            const elem = e.currentTarget,
                index = parseInt(elem.getAttribute("index")),
                dir = parseInt(elem.getAttribute("value")),
                {order} = this.state,
                {items} = order;
            if (items.length>0){
                item = items[index];
                item.quantity+=dir;
                if (item.quantity === 0){
                    items.splice(index,1);
                } else
                    items[index] = item;
                order.items = items;
            }
            this.store('order',order);
        }

        removeItem(e){
            e.preventDefault();
            let item;
            const elem = e.currentTarget,
                index = parseInt(elem.getAttribute("index")),
                {order} = this.state,
                {items} = order;
            if (items.length>0){
                items.splice(index,1);
                order.items = items;
            }
            this.store('order',order);
        }

        saveOrder(item){
            const {shop,order} = this.state;
            let ord = ( checkKeys( order||{} ) )
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
            this.store('order',ord);
        }

        toggleModal(e){
            e.preventDefault();
            this.setState({modal:!this.state.modal})
        }

        componentDidMount(){
            const {
                order,
                shop
            } = storage.all(['order','shop']);
            this.setState({order,shop});
        }

        render(){
            const {pathname} = this.props.location,
                {order,shop,modal} = this.state,
                {change,convert} = this.context,
                hideBanner = pathname.match('checkout'),
                hideCrumbs = pathname.match('/dashboard');

            return (
                <div className="container-fluid">
                    <Modal show={modal}>
                        <div
                            className="container-fluid">
                            <div className="row justify-content-end">
                                <button
                                    onClick={this.toggleModal}
                                    className="button bolder xpadding">
                                    <div className="olheight white">
                                        <i className="vmiddle font20 fas fa-times-circle hfix"></i>
                                        <span className="vmiddle shmargin">close</span>
                                    </div>
                                </button>
                            </div>
                            <div className="row ">
                                <div className="col-md-12 mvpadding">
                                    <OrderPreview
                                        removeItem={this.removeItem}
                                        state={{change,shop,order,convert}}
                                        toggleItem={this.toggleItem}/>
                                </div>
                            </div>
                        </div>
                    </Modal>
                    <div className={hideCrumbs ? "hidden" : "row"}>
                        <BreadCrumb
                            hideBanner={hideBanner}
                            location={pathname}
                            removeItem={this.removeItem}
                            current={matchSection(pathname)}
                            toggleModal={this.toggleModal}
                            state={{change,shop,order,convert}}
                            toggleItem={this.toggleItem}/>
                    </div>
                    <div className="row">
                        <div className="col-md-12 nopadding"
                            style={{margin:"0px"}}>
                            <Target
                                toggleItem={this.toggleItem}
                                removeItem={this.removeItem}
                                save = {this.saveOrder}
                                {...this.state}
                                {...this.props}/>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
