import ReactDOM from 'react-dom';
import React, {
    Component,
    useContext
} from 'react';
import {
    Redirect
} from 'react-router-dom'
import {
    OrderPreview
} from '../../../components/hocs/OrderVisualization.jsx';
import {
    AuthUser
} from '../../../components/helper/AuthUser.jsx';
import {
    POST
} from '../../../components/api.jsx';

import Modal from '../../../components/control/Modal.jsx';

import CheckoutForm from './form/CheckoutForm.jsx';

import ConditionalRender from '../../../components/hocs/ConditionalRender.jsx';

import ValidationHandler from '../../../components/hocs/ValidationHandler.jsx';

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
        max:50
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

const defaultForm ={
    ord_cli_address:"",
    ord_cli_telephone:"",
    ord_cli_name:"",
    ord_cli_email:"",
    ord_observations:""
}

function getTotal(items){
    const tot = items.reduce(
        (t,e) =>  t+=e.total,0
    )
    return Math.trunc(tot*100)/100
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

export default class Checkout extends Component {
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
        const loc = this.props.location.state||{},
            user = this.context||{};
        if( ( ( loc.order||{} ).items||[]).length<=0 )
            return this.setState({error:"you have not selected any items."})
        this.setState(
            {loading:true},
            () =>{
                this.props.performRequest({
                    method:'post',
                    options:{
                        url:"/order/save",
                        withCredentials:false,
                        data:{
                            ...loc.order,
                            client:{
                                ord_cli_id:user.cli_id||"",
                                ...form,
                            },
                            ord_total:getTotal( loc.order.items ),
                            currency:loc.change.curr
                        },
                    },
                    successCallback:
                        res => {
                            this.setState({
                                loading:false,
                                success:res.data.msg
                                },
                                () => this.toggleModal()
                            )
                        },
                    errorCallback: (err) => {
                        this.setState({
                            loading:false
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

    componentWillUnmount(){
        this.props.cancelRequest();
    }

    redirect(){
        const loc = this.props.location.state||{};
        this.props.history.push("/",{
            change:loc.change
        })
    }

    render () {
        const props = this.props,
            loc = props.location.state||{},
            order = loc.order||{},
            rate = loc.change||{},
            curr = loc.curr,
            form = initializeForm(this.context);

        return (
            <>
                <Modal show={this.state.show}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12 container-fluid">
                                <h3 className="selected">{this.state.success}</h3>
                            </div>
                        </div>
                        <div className="row justify-content-end">
                            <div className="col-md-4">
                                <div className="alignright">
                                    <button
                                        onClick={this.redirect}
                                        style={{backgroundColor:"var(--main)",color:"white"}}
                                        className="button bolder wfull">
                                        accept
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
                <div className="container-fluid mvpadding">
                    <div className="row">
                        <ConditionalRender
                            other={<></>}
                            condition={props.hideForm}>
                            <div className="col-md-6">
                                <h4 className="bolder">Almost there!</h4>
                                <p className="bolder redfont">{this.state.error}</p>
                                <ValidationHandler
                                    submit={this.submit}
                                    fieldDisplay={fieldDisplay}
                                    validation={validation}
                                    form = {form}>
                                    <CheckoutForm
                                        cancel={this.props.cancelRequest}
                                        loading={this.state.loading}/>
                                </ValidationHandler>
                            </div>
                        </ConditionalRender>
                        <div className={props.hideForm ? "col-md-12" : "col-md-6"}>
                            <OrderPreview
                                toggleItem={props.toggleItem}
                                state={loc}
                                hideButton={!props.showButton}/>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
