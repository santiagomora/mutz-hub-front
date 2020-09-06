import React,{
    useState,
    useEffect
} from 'react';
import {
    OrderTable,
    ItemTable
} from '../../../components/tables/orders/OrderTable.jsx';
import{
    LargePrice
} from '../../../helper/helperIndex.jsx';

import RequestHandler from '../../../components/hocs/RequestHandler.jsx';

import Modal from '../../../components/control/Modal.jsx';

function SingleOrder({data,toggleModal,modalState}){
    const order = data.order.pop()||{};
    return(
        <div
            className="container-fluid"
            style={{maxHeight:"90vh",overflowY:"scroll"}}>
            <div className="row justify-content-end sticky-top">
                <button onClick={
                        e => {
                            e.preventDefault();
                            let {modal,id} = modalState;
                            modal = false;
                            toggleModal({modal,id});
                        }
                    } className="button bolder xpadding">
                    <div className="olheight white">
                        <i className="vmiddle font20 fas fa-times-circle hfix"></i>
                        <span className="vmiddle shmargin">close</span>
                    </div>
                </button>
            </div>
            <div className="row">
                <div className="col-md-8">
                    <h3 className="nomargin bolder selected">
                        {`Order #${order.ord_id}, ${order.ord_shop}`}
                    </h3>
                </div>
                <div className="col-md-4 alignright">
                    <h3 className="nomargin alignright bolder">
                        {order.ord_date}
                    </h3>
                </div>
            </div>
            <div className="secondary-line mvmargin"/>
            <div className="row mhpadding">
                <div className="col-md-6">
                    <h4 className="bolder">{order.ord_cli_name}</h4>
                </div>
                <div className="col-md-6 alignright">
                    <h4 className={`${order.ord_status} bolder`}>
                        {order.ord_status}
                    </h4>
                </div>
            </div>
            <div className="row mhpadding">
                <div className="col-md-3 sbpadding">
                    <h5 className="bolder nomargin">
                        Cellphone:
                    </h5>
                    {order.ord_cli_telephone}
                </div>
                <div className="col-md-3 sbpadding">
                    <h5 className="bolder nomargin">
                        Email:
                    </h5>
                    {order.ord_cli_email}
                </div>
                <div className="col-md-6">
                    <h5 className="nomargin bolder">
                        Delivery address:
                    </h5>
                    {order.ord_cli_address}
                </div>
            </div>
            <div className="row  mtpadding">
                <div className="col-md-12">
                    <h5 className="bolder ">
                        Observations:
                    </h5>
                    {order.ord_observations||"No observations made"}
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 mvpadding">
                    <ItemTable
                        items={order.items}
                        ord_currency={order.ord_currency}
                        ord_convertion={order.ord_conversion}/>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 alignright">
                    <div className="grayline"></div>
                    <div className="mtpadding">
                        <LargePrice
                            text={<span className="bolder">Shipping:</span>}
                            price={order.ord_shipping*order.ord_conversion}
                            currency={order.ord_currency}
                            withSum/>
                    </div>
                    <div className="shpadding mbpadding">
                        <LargePrice
                            text={<span className="bolder">Total:</span>}
                            price={order.ord_total*order.ord_conversion}
                            currency={order.ord_currency}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Single = RequestHandler(
    SingleOrder,{
    options: ({id}) =>({
        url:`/order/single/${id}`
    }),
    method:'get'
})

export default function({data}){
    const [state,toggle] = useState({modal:false,id:''}),
        onClick= function (id){
            return e => {
                e.preventDefault();
                toggle({
                    modal:!state.modal,
                    id
                });
            };
        };
    return(
        <div className="container-fluid">
            <Modal show={state.modal}>
                <Single
                    toggleModal={toggle}
                    params={{id:state.id}}
                    modalState={state}
                    requestOnMount={true}/>
            </Modal>
            <div className="row">
                <div className="col-md-12 nopadding">
                    <OrderTable
                        clickHandler={onClick}
                        data={data}/>
                </div>
            </div>
        </div>
    )
}
