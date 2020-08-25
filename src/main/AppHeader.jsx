import React, {
    Component
} from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';
import {
    GET
} from '../components/api.jsx';
import {
    saveHistory
} from '../components/helper/saveHistory.jsx';

import ConditionalRender from '../components/hocs/ConditionalRender.jsx';

import LoadingComponent from '../components/hocs/LoadingComponent.jsx';

import BreadCrumb from '../components/control/BreadCrumb.jsx';

import Title from '../components/control/Title.jsx';

export const ExchangeContext = React.createContext();

const CURRENCY = ["USD","EUR"];

function getConversions(){
    const loc = this.props.location||{};
    GET({
        url:'https://api.exchangeratesapi.io/latest',
        withCredentials:false
    })
    .then(
        res => {
            const usd = res.data.rates.USD;
            this.setState({
                ready:true,
                change:{
                    rate:{
                        "USD":usd,
                        "EUR":1/usd
                    },
                    names:CURRENCY,
                    curr:1
                }},
                () => this.changeCurrency(1)
            )
        }
    )
    .catch( err =>{
        console.log(err);
    } );
}

const exclude = ["auth"];

const matchExcluded = ( path ) =>
    exclude.filter(
        e => path.match( e )
    ).pop();

class AppHeader extends Component {

    constructor(props){
        super(props);
        this.state={
            ready:false,
            change:{
                curr:1,
                names:CURRENCY,
                rate:{}
            }
        };
        this.saveHistory = saveHistory.bind(this);
        this.changeCurrency = this.changeCurrency.bind(this);
        this.getConversions = getConversions.bind(this);
    }

    changeCurrency(curr){
        const data = this.state.change;
        data.curr = curr;
        this.saveHistory({name:'change',data});
    }

    componentDidMount(){
        this.getConversions();
    }


    render(){
        const props = this.props,
            l = props.location,
            path = l.pathname,
            loc = l.state||{},
            change = loc.change||this.state.change;

        return (
            <LoadingComponent
                data={this.state.ready}>
                <ExchangeContext.Provider
                    value={change}>
                    <div className="container-fluid">
                        <ConditionalRender
                            condition={matchExcluded(path)}
                            other = {<></>}>
                            <div className="row justify-content-center">
                                <Title
                                    currency={CURRENCY}
                                    change ={change}
                                    logout={props.logout}
                                    changeCurrency={this.changeCurrency}
                                    user={this.props.user}/>
                            </div>
                            <div className="line mvmargin">
                            </div>
                        </ConditionalRender>
                        <div className="row">
                            { this.props.children }
                        </div>
                    </div>
                </ExchangeContext.Provider>
            </LoadingComponent>
        )
    }
}

export default withRouter(AppHeader);
