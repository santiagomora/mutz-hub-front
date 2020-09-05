import React, {
    Component
} from 'react';
import {
    Redirect
} from 'react-router-dom'
import {
    OrderPreview
} from '../../../components/control/OrderVisualization.jsx';
import{
    storage,
    round
} from '../../../helper/helperIndex.jsx';

import AuthUser from '../../../context/AuthUser.jsx';

import Modal from '../../../components/control/Modal.jsx';

import CheckoutForm from './form/CheckoutForm.jsx';

import ConditionalRender from '../../../components/composition/ConditionalRender.jsx';

import RequestHandler from '../../../components/hocs/RequestHandler.jsx';

import SectionTitle from '../../../components/control/SectionTitle.jsx';

const validation = {
    ord_cli_address:{
        required:true,
        max:100
    },
    ord_cli_telephone:{
        required:true,
        numeric:true,
        max:30
    },
    ord_cli_name:{
        required:true,
        max:50,
        alphabetic:true
    },
    ord_cli_email:{
        required:true,
        email:true,
        max:80
    },
    ord_observations:{
        required:false,
        max:250
    }
}

const fieldDisplay ={
    ord_cli_address:"Delivery address",
    ord_cli_telephone:"Phone number",
    ord_cli_name:"Name",
    ord_cli_email:"Email",
    ord_observations:"Observations"
}

const form ={
    ord_cli_address:"",
    ord_cli_telephone:"",
    ord_cli_name:"",
    ord_cli_email:"",
    ord_observations:""
}

function getTotal(items){
    const tot = items.reduce(
        (t,e) =>  t+=(e.total*e.quantity),0
    )
    return round( tot )
}

function initializeForm(user){
    return({
        ord_cli_address:user.cli_address||"",
        ord_cli_telephone:user.cli_telephone||"",
        ord_cli_name:user.cli_name||"",
        ord_cli_email:user.cli_email||"",
        ord_observations:""
    })
}

class Checkout extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading:false,
            show:false
        }
        this.submit = this.submit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.redirect = this.redirect.bind(this);
    }

    static contextType = AuthUser;

    submit(form){
        const {order,change,convert} = this.props,
            user = this.context.user||{};
        if( ( ( order||{} ).items||[]).length<=0 )
            return this.setState({error:"you have not selected any items."})
        this.setState(
            {loading:true},
            () =>{
                const {shipping,currency} = order.shop,
                    {rate,tag} = change,
                    total = getTotal(order.items);
                this.props.requestHandler({
                    method:'post',
                    options:() => ({
                        url:"/order/save",
                        withCredentials:false,
                        data:{
                            ...order,
                            client:{
                                ord_cli_id:user.cli_id||"",
                                ...form,
                            },
                            conversion: currency===change.curr
                                ? 1
                                : rate[tag],
                            shipping,
                            total:total+shipping,
                            currency:change.curr
                        },
                    }),
                    onSuccess:
                        res => {
                            this.setState({
                                loading:false,
                                success:res.data.msg
                                },
                                () => {
                                    storage.delete(['order','shop']);
                                    this.toggleModal()
                                }
                            )
                        },
                    onError: (err) => {
                        this.setState({
                            loading:false,
                            error: "An error ocurred while processing your order."
                        })
                    }
                });
            }
        )
    }

    toggleModal(){
        this.setState(
            {show:!this.state.show}
        )
    }

    redirect(){
        this.props.history.push("/")
    }

    render () {
        const props = this.props,
            {order,change,convert} = props,
            {user} = this.context,
            curr = change.curr,
            form = initializeForm(user||{});
        return (
            <div className="container-fluid mvpadding">
                <Modal show={this.state.show}>
                    <div className="container-fluid mvpadding">
                        <div className="row">
                            <div className="col-md-12 container-fluid">
                                <h3 className="selected">
                                    {this.state.success}
                                </h3>
                            </div>
                        </div>
                        <div className="row justify-content-end">
                            <div className="col-md-4">
                                <div className="alignright">
                                    <button
                                        onClick={this.redirect}
                                        style={{backgroundColor:"var(--main)",color:"white"}}
                                        className="button bolder wfull">
                                        Accept
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
                <SectionTitle
                    title="Almost there!"
                    iconurl="/img/checkout.png"
                    description="let us know the details of your order"/>
                <div className="row mvpadding">
                    <ConditionalRender
                        other={<></>}
                        condition={props.hideForm}>
                        <div className="col-md-6">
                            <p className="bolder redfont nomargin">
                                {this.state.error}
                            </p>
                            <CheckoutForm
                                submit={this.submit}
                                fieldDisplay={fieldDisplay}
                                validation={validation}
                                form = {form}
                                cancel={this.props.cancelRequest}
                                loading={this.state.loading}/>
                        </div>
                    </ConditionalRender>
                    <div className={props.hideForm ? "col-md-12" : "col-md-6"}>
                        <h3 className="bolder mtmargin">Your order</h3>
                        <OrderPreview
                            removeItem={props.removeItem}
                            toggleItem={props.toggleItem}
                            state={{order,change,convert}}
                            hideButton={!props.showButton}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default RequestHandler( Checkout );
