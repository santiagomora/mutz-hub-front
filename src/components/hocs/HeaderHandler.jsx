import React, {
    Component
} from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';
import {
    GET
} from '../../utils/api.jsx';
import {
    round,
    storage
} from '../../helper/helperIndex.jsx';

import RequestHandler from '../hocs/RequestHandler.jsx';

import ExchangeContext from '../../context/ExchangeContext.jsx';

import Header from '../../main/Header.jsx';

const CURRENCY = ["USD","EUR"];

function HeaderHandler ( Body ) {

    return class handler extends Component {

        constructor(props){
            super(props);
            this.state={
                change:{
                    curr:1,
                    names:CURRENCY,
                    rate:{},
                    tag:"USD"
                }
            };
            this.changeCurrency = this.changeCurrency.bind(this);
            this.getConversions = this.getConversions.bind(this);
            this.convert = this.convert.bind(this);
        }

        changeCurrency(curr){
            const {change} = this.state;
            change.curr = curr;
            change.tag = change.names[curr-1];
            this.setState(
                {change},
                () => storage.set('change',change)
            )
        }

        convert(shopCurrency,price){
            const {curr,rate,names} = this.state.change,
                currName = names[curr-1];
            return round(
                (shopCurrency !== curr)
                    ? price*rate[currName]
                    : price
            )
        }

        getConversions( data ){
            const stored = storage.get('change')||{},
                usd = data.rates.USD,
                curr = stored.curr||1,
                tag = CURRENCY[curr-1];
            this.setState({
                change:{
                    rate:{
                        "USD":round(usd),
                        "EUR":round(1/usd)
                    },
                    names:CURRENCY,
                    curr,
                    tag
                }},
                () => this.changeCurrency(curr)
            )
        }

        componentDidMount(){
            const {data} = this.props;
            if ( data )
                this.getConversions( data );
        }

        render(){
            const props = this.props,
                {change} = this.state,
                convert = this.convert;
            return (
                <ExchangeContext.Provider
                    value={{change,convert}}>
                    <Header
                        requestHandler={props.requestHandler}
                        change={change}
                        convert={this.changeCurrency}/>
                    <Body
                        change={change}
                        convert={convert}
                        {...props}/>
                </ExchangeContext.Provider>
            )
        }
    }

}

export default function( Target ){
    return RequestHandler(
        HeaderHandler( Target ),{
            options:(params) => ({
                url:'https://api.exchangeratesapi.io/latest',
                withCredentials:false
            }),
            method:'get'
    })
}
