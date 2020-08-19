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
import LoadingComponent from './LoadingComponent.jsx';
import {saveHistory} from '../helper/saveHistory.jsx';
import BreadCrumb from '../control/BreadCrumb.jsx';
import {
    OrderBanner,
    OrderPreview
} from './OrderVisualization.jsx';

const CURRENCY = ["USD","EUR"];

export const ExchangeContext = React.createContext();

const sections =[
    "order",
    "checkout",
    "shops"
];

const matchSection = (path) => sections.filter(
    e => path.match(e)
).pop();


export default class OrderHandler extends Component {
    constructor(props){
        super(props);
        this.state={
            ready:false,
            order:[],
            showOrder:false,
            display:false
        };
        this.displayOrder = this.displayOrder.bind(this);
        this.saveHistory = saveHistory.bind(this);
        this.toggleItem = this.toggleItem.bind(this);
    }

    changeCurrency(curr){
        this.saveHistory({name:'curr',data:curr});
    }

    componentDidMount(){
        GET({
            endpoint:'https://api.exchangeratesapi.io/latest'
        })
        .then( res => {
            const usd = res.data.rates.USD;
            this.setState({
                rate:{
                    usd:usd,
                    eur:1/usd
                },
                ready:true,
                order:[]
            })
        } )
        .catch( err =>{
            console.log(err);
        } );
    }

    saveOrder(item){
        const st = this.props.location.state||{},
            order = st.order||{},
            keys = Object.keys(order),
            shop = st.shop;
        let store;
        if( keys.length>0 ){
            store = {
                shop:shop,
                items: (item.item.shop.id === order.shop.id)
                ? [
                    ...order.items,
                    item
                ] : [item]
            }
        } else {
            store = {
                shop:shop,
                items:[item]
            };
        }
        this.saveHistory({name:'order',data:store});
    }

    toggleItem(e){
        e.preventDefault();
        let item;
        const elem = e.currentTarget,
            index = parseInt(elem.getAttribute("index")),
            dir = parseInt(elem.getAttribute("value")),
            st = this.props.location.state||{},
            order = st.order,
            items = order.items;

        if (items.length>0){
            item = items[index];
            item.quantity+=dir;
            if (item.quantity === 0){
                items.splice(index,1);
            } else
                items[index] = item;
            order.items = items;
        }
        this.saveHistory({name:'order',data:order});
    }

    displayOrder(e){
        e.preventDefault();
        const st = this.props.location.state||{};
        const data = st.display == undefined ? true : !st.display;
        this.saveHistory({name:'display',data});
    }

    render(){
        const props = this.props,
            l = props.location,
            path = l.pathname,
            loc = l.state||{},
            curr = loc.curr||1,
            display = loc.display,
            change = {
                curr,
                rate:this.state.rate,
                names:CURRENCY
            },
            order = loc.order||[],
            hideBanner = l.pathname.match("checkout");
        return (
            <ExchangeContext.Provider
                value={change}>
                <LoadingComponent data={this.state.ready}>
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="col-md-7" >
                                <h1 className="app-title bolder">
                                    the mutz hub.
                                </h1>
                            </div>
                            <div className="col-md-5 alignright">
                                <div style={{
                                        position:"absolute",
                                        bottom:"5px",
                                        right:"15px"
                                    }}>
                                    <div className={hideBanner ? "hidden" : "iblock"}>
                                        <OrderBanner
                                            display={display}
                                            order={order}
                                            curr={curr}
                                            rate={change}
                                            toggleItem={this.toggleItem}
                                            displayOrder={this.displayOrder}/>
                                    </div>
                                    <div className="iblock">
                                        <Toggle
                                            changeSide={this.changeCurrency.bind(this)}
                                            rightTitle={CURRENCY[1]}
                                            leftTitle={CURRENCY[0]}
                                            name="currency"
                                            side={change.curr}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <BreadCrumb
                                location={loc}
                                current={matchSection(path)}/>
                        </div>
                        <div className="line mvmargin"></div>
                        <div className="row">
                            <div className={
                                display&&!hideBanner
                                    ? "col-md-8"
                                    : "col-md-12" }
                                style={{margin:"0px"}}>
                            {
                                React.cloneElement(
                                        this.props.children,
                                        {
                                            save:this.saveOrder.bind(this),
                                            stored:loc,
                                            display,
                                            toggleItem:this.toggleItem
                                        }
                                    )
                            }
                            </div>
                            <div  className={
                                display&&!hideBanner
                                    ? "col-md-4 mvpadding shadowleft ordercont"
                                    : "hidden"
                                }>
                                <OrderPreview
                                    curr={curr}
                                    rate={change}
                                    toggleItem={this.toggleItem}
                                    order={order}/>
                            </div>
                        </div>
                        <div className="mvmargin secondary-line"/>
                        <div
                            style={{paddingBottom:"20px"}}
                            className="alignright">
                                Developed by
                                <span className="bolder shmargin">santiagomora.</span>
                            </div>
                    </div>
            </LoadingComponent>
        </ExchangeContext.Provider>
        )
    }
}
