import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import {
    CheckBox
} from '../../../components/input/CheckBox.jsx';
import {
    currencyChange,
    searchItem,
    round
} from '../../../helper/helperIndex.jsx';
import {
    RESOURCE_URL
} from '../../../utils/api.jsx';

import DisplayVariations from './forms/DisplayVariations.jsx';

import DisplayExtras from './forms/DisplayExtras.jsx';

const WIDTH = 150;

const HEIGHT = 150;

export default class SelectVariations extends Component {

    constructor(props){
        super(props);
        const item = props.selected
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

    addVariation(e){
        e.preventDefault();

        const elem = e.currentTarget,
            cat = elem.getAttribute("category"),
            val = parseInt(elem.getAttribute("value")),
            price = round( parseFloat( elem.getAttribute("price") ) ),
            title = elem.getAttribute("title"),
            form = this.state.form,
            vart = form.variations[cat]||{};
        if( vart.var_id === val ){
            delete form.variations[cat];
            form.total -= price;
        } else {
            if (form.variations[cat]){
                form.total -= round(form.variations[cat].price);
            }
            form.variations[cat] = {
                var_id:val,
                var_name:title,
                price
            };
            form.total += price;
        }
        this.setState({form});
    }

    addExtra(e){
        e.preventDefault();

        const elem = e.currentTarget,
            val = parseInt(elem.getAttribute("value")),
            title = elem.getAttribute("title"),
            price = round(parseFloat(elem.getAttribute("price"))),
            form = this.state.form,
            index = searchItem( form.extras,val );

        if( index>=0 ) {
            form.extras.splice(index,1);
            form.total -= price;
        } else {
            form.extras.push({
                id:val,
                name:title,
                price
            });
            form.total += price;
        }
        this.setState({form});
    }


    addQuantity(e){
        e.preventDefault();
        const dir = parseInt(e.currentTarget.getAttribute("value")),
            form = this.state.form,
            q = form.quantity;
        if ( q+dir>0 ){
            form.quantity = q+dir;
            this.setState({form});
        }
    }

    saveOrder(e){
        e.preventDefault();
        const selected = this.props.selected,
            data = selected.data,
            form = this.state.form,
            vari = Object.keys(data.variations)||[];

        if( Object.keys(this.state.form.variations).length<2&&vari.length>0 )
            this.setState({error:"You must select a value for each variation. Extras are optional."})
        else {
            this.props.toggleModal();
            this.props.saveOrder(form);

        }
    }

    componentDidMount(){
        const {data} = this.props.selected,
            {form} = this.state;
        form.total = data.base_price;
        this.setState({form});
    }

    render(){
        const props = this.props,
            {selected,change,convert} = props,
            {names,curr,rate,tag} = change,
            {data,shop} = selected,
            {form} = this.state,
            {total} = this.state.form,
            {extras} = data,
            currentName = tag,
            price = data.base_price;

        return (
            <div
                className="container-fluid"
                style={{height:"90vh"}}>
                <div className="row justify-content-end">
                    <button onClick={props.toggleModal} className="button bolder">
                        Close
                    </button>
                </div>
                <div className="row responsiveHeight" style={{overflowY:"scroll"}}>
                    <div className="col-md-4">
                        <img
                            src={`${RESOURCE_URL}${data.pic}`}
                            width={`${WIDTH}px`}
                            height={`${HEIGHT}px`}/>
                    </div>
                    <div className="col-md-8">
                        <h3 className="bolder">Choose your extras</h3>
                        <h4>
                            <span>You selected </span>
                            <span className="bolder redfont smargin">{data.name}</span>
                        </h4>
                        <h5>
                            <span className="bolder">base price:</span>
                            <span className="shmargin">{convert(shop.currency,price)}</span>
                            <span className="selected">{currentName}</span>
                        </h5>
                        <p>{data.description}</p>
                    </div>
                    {
                        Object.keys(data.variations||{}).length>0
                        ?
                            <div className="col-md-12">
                                <DisplayVariations
                                    variations={data.variations}
                                    convert={convert}
                                    crr={currentName}
                                    shop={shop}
                                    handler={this.addVariation}
                                    form={form}/>
                            </div>
                        : <></>
                    }
                    {
                        extras.length>0
                        ?
                            <div className="col-md-12">
                                <h5 className="bolder">extra ingredients:</h5>
                                <DisplayExtras
                                    convert={convert}
                                    extras={extras}
                                    shop={shop}
                                    crr={currentName}
                                    handler={this.addExtra}
                                    form={form}/>
                            </div>
                        : <></>
                    }
                    </div>
                    <div
                        className="sticky-bottom row justify-content-end"
                        style={{paddingTop:"10px"}}>
                        <div className="col-md-12 alignright">
                            <span className="bolder" style={{color:"var(--outline)"}}>
                                {this.state.error}
                            </span>
                        </div>
                        <div className="col-md-4 alignright">
                            <h5 className="nomargin  shmargin bolder iblock">how many items</h5>
                            <div className="iblock">
                                <button
                                    value={-1}
                                    className="button bolder"
                                    style={{backgroundColor:"var(--main)",height:"30px",width:"30px"}}
                                    onClick={this.addQuantity}>
                                    -
                                </button>
                                <span className="shmargin bolder">
                                    {form.quantity}
                                </span>
                                <button
                                    value={1}
                                    className="button bolder circle"
                                    style={{backgroundColor:"var(--main)",height:"30px",width:"30px"}}
                                    onClick={this.addQuantity}>
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="col-md-4 alignright">
                            <h5>
                                <span className="bolder">Total...:</span>
                                <span className="shmargin">
                                    { convert(shop.currency,total*form.quantity)}
                                </span>
                                <span className="selected">
                                    {currentName}
                                </span>
                            </h5>
                        </div>
                        <div className="col-md-4 alignright">
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
        );
    }
}
