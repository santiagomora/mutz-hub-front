import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import {
    ExchangeContext
} from '../../components/hocs/OrderHandler.jsx';
import {
    CheckBox
} from '../../components/input/CheckBox.jsx';
import {
    currencyChange
} from '../../components/helper/currencyChange.jsx';
import {
    searchItem
} from '../../components/helper/searchItem.jsx';
import {
    round
} from '../../components/helper/round.jsx';


import DisplayVariations from './forms/DisplayVariations.jsx';
import DisplayExtras from './forms/DisplayExtras.jsx';

const SERVER_URL = 'http://localhost:8000';

const WIDTH = 150;

const HEIGHT = 150;

export default class SelectVariations extends Component {

    constructor(props){
        super(props);
        const item = props.selected.selected.e
        this.state={
            form:{
                item,
                extras:[],
                variations:{},
                total:0,
                quantity:1
            }
        };
        this.addExtra = this.addExtra.bind(this);
        this.addVariation = this.addVariation.bind(this);
        this.addQuantity = this.addQuantity.bind(this);
    }

    static contextType = ExchangeContext;

    addVariation(e){
        e.preventDefault();
        const elem = e.currentTarget,
            cat = elem.getAttribute("category"),
            val = parseInt(elem.getAttribute("value")),
            title = elem.getAttribute("title"),
            price = parseFloat(elem.getAttribute("price")),
            form = this.state.form,
            vart = form.variations[cat]||{};
        console.log(form.total+price)
        if( vart.var_id === val ){
            delete form.variations[cat];
            form.total -= form.quantity*price;
        } else {
            if (form.variations[cat]){
                form.total -= form.quantity*form.variations[cat].price;
            }
            form.variations[cat] = {
                var_id:val,
                var_name:title,
                price
            };
            form.total += form.quantity*price;
        }
        this.setState({form});
    }

    addExtra(e){
        e.preventDefault();
        const elem = e.currentTarget,
            val = parseInt(elem.getAttribute("value")),
            title = elem.getAttribute("title"),
            price = parseFloat(elem.getAttribute("price")),
            form = this.state.form,
            index = searchItem( form.extras,val );
        if( index>  0 ) {
            form.extras.splice(index,1);
            form.total -= form.quantity*price;
        } else {
            form.extras.push({
                id:val,
                name:title,
                price
            });
            form.total += form.quantity*price;
        }
        this.setState({form});
    }

    saveOrder(e){
        e.preventDefault();
        const selected = this.props.selected.selected,
            data = selected.e,
            vari = Object.keys(data.variations)||[];
        if( Object.keys(this.state.form.variations).length<2&&vari.length>0 )
            this.setState({error:"You must select a value for each variation. Extras are optional."})
        else {
            this.props.toggleModal();
            this.props.saveOrder(this.state.form);
        }
    }

    addQuantity(e){
        e.preventDefault();
        const dir = parseInt(e.currentTarget.getAttribute("value")),
            form = this.state.form,
            q = form.quantity;
        if ( q+dir>0 ){
            form.total += dir*form.total/q;
            form.quantity = q+dir;
            this.setState({form});
        }
    }

    componentDidMount(){
        const selected = this.props.selected.selected,
            data = selected.e,
            form = this.state.form;
        form.total = data.base_price;
        this.setState({form});
    }

    render(){
        const props = this.props,
            selected = props.selected.selected,
            data = selected.e,
            shop = selected.shop,
            rate = this.context,
            form = this.state.form,
            cat = data.category,
            currentName = rate.names[rate.curr-1],
            extras = shop.extras[data.category.name]||[],
            sameCurr = rate.curr === shop.currency,
            change =rate.rate[currentName.toLowerCase()] ;

        let price = data.base_price,
            total = this.state.form.total;

        total = sameCurr
            ? total
            : total*change;

        price = sameCurr
            ? price
            : price*change;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10 container-fluid">
                        <div className="row">
                            <div className="col-md-4">
                                <img
                                    src={`${SERVER_URL}${data.pic}`}
                                    width={`${WIDTH}px`}
                                    height={`${HEIGHT}px`}/>
                            </div>
                            <div className="col-md-8">
                                <h3 className="bolder">Choose your extras</h3>
                                <h4>
                                    <span>You selected </span>
                                    <span className="bolder red smargin">{data.name}</span>
                                </h4>
                                <h5>
                                    <span className="bolder">base price:</span>
                                    <span className="shmargin">{round(price)}</span>
                                    <span className="selected">{currentName}</span>
                                </h5>
                                <p>{data.description}</p>
                            </div>
                    </div>
                    </div>
                    <div className="col-md-2">
                        <div className="alignright">
                            <button onClick={props.toggleModal} className="button bolder">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
                {
                    Object.keys(data.variations||{}).length>0
                    ?
                        <div className="row">
                            <div className="col-md-12">
                                <DisplayVariations
                                    variations={data.variations}
                                    cont={this.context}
                                    shop={shop}
                                    handler={this.addVariation}
                                    form={this.state.form}/>
                            </div>
                        </div>
                    : <></>
                }
                {
                    extras.length>0
                    ?
                        <div className="row">
                            <div className="col-md-12">
                                <h5 className="bolder">extra ingredients:</h5>
                                <DisplayExtras
                                    extras={extras}
                                    cont={this.context}
                                    shop={shop}
                                    handler={this.addExtra}
                                    form={this.state.form}/>
                            </div>
                        </div>
                    : <></>
                }
                <div className="row justify-content-end" style={{paddingTop:"10px"}}>
                    <div className="col-md-12 alignright">
                        <h5>
                            <span className="bolder">Total...:</span>
                            <span className="shmargin">{round(total)}</span>
                            <span className="selected">{currentName}</span>
                        </h5>
                        <div className="smargin">
                            <span className="smargin">how many items:</span>
                            <button
                                value={-1}
                                className="button bolder"
                                style={{backgroundColor:"var(--main)",height:"30px",width:"30px"}}
                                onClick={this.addQuantity}>
                                -
                            </button>
                            <span className="shmargin bolder">{form.quantity}</span>
                            <button
                                value={1}
                                className="button bolder circle"
                                style={{backgroundColor:"var(--main)",height:"30px",width:"30px"}}
                                onClick={this.addQuantity}>
                                +
                            </button>
                        </div>
                        <div>
                            <span className="bolder" style={{color:"var(--outline)"}}>
                                {this.state.error}
                            </span>
                        </div>
                        <div>
                            <button
                                className="button bolder shmargin"
                                style={{backgroundColor:"transparent",color:"var(--lgray)"}}
                                onClick={e => {e.preventDefault();this.props.toggleModal()}}>
                                cancel
                            </button>
                            <button
                                className="button bolder"
                                style={{backgroundColor:"var(--main)"}}
                                onClick={this.saveOrder.bind(this)}>
                                add to order.
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
