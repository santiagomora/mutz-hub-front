import React from 'react';
import {
    round,
    Price,
    Variations,
    getItemTotal
} from '../../../helper/helperIndex.jsx';
import {
    RESOURCE_URL
} from '../../../utils/api.jsx';

const WIDTH = "60px";

export function Columns(clickHandler){
    return [{
            Header: "ID",
            accessor:"ord_id",
            width:40,
            headerClassName: 'bolder alignleft'
        },{
            Header: "Date",
            maxWidth:100,
            accessor:"ord_date",
            headerClassName: 'bolder alignleft',
            Cell:({original}) => {
                return(
                    <span className="break">{original.ord_date}</span>
                )
            }
        },{
            Header: "Shop",
            accessor:"ord_shop",
            headerClassName: 'bolder alignleft'
        },{
            Header: "Name",
            accessor:"ord_cli_name",
            headerClassName: 'bolder alignleft'
        },{
            Header: "Email",
            accessor:"ord_cli_email",
            headerClassName: 'bolder alignleft'
        },{
            Header: "Phone",
            accessor:"ord_cli_telephone",
            headerClassName: 'bolder alignleft'
        },{
            Header: "Delivery Address",
            minWidth:180,
            accessor:"ord_cli_address",
            headerClassName: 'bolder alignleft',
            Cell:({original}) => {
                return (
                    <div className="break wfull">
                        {original.ord_cli_address}
                    </div>
                )
            }
        },
        {
            Header: "Shipping",
            accessor:"ord_shipping",
            maxWidth:100,
            headerClassName: 'bolder alignleft',
            Cell:({original}) => {
                const {ord_shipping,ord_currency,ord_conversion} = original;
                return (
                    <Price
                        text=""
                        price={ord_shipping*ord_conversion}
                        currency={ord_currency}/>
                )
            }
        },{
            Header: "Total",
            accessor:"ord_total",
            maxWidth:120,
            headerClassName: 'bolder alignleft',
            Cell:({original}) => {
                const {ord_total,ord_currency,ord_conversion} = original;
                return (
                    <Price
                        text=""
                        price={ord_total*ord_conversion}
                        currency={ord_currency}/>
                )
            }
        },{
            Header: "Status",
            accessor:"ord_status",
            headerClassName: 'bolder alignleft',
            Cell:({original}) => {
                const {ord_status} = original;
                return (
                    <span className={`${ord_status} bolder`}>{ord_status}</span>
                )
            }
        },{
            Header: "",
            width:40,
            accessor:"ord_id",
            headerClassName: 'bolder alignright',
            Cell:({original}) => {
                return (
                    <button
                        onClick={clickHandler(original.ord_id)}
                        className="valign stext iblock bolder button xpadding">
                        <i className="fas fa-eye"></i>
                    </button>
                )
            }
        }/*{
            Header: "Observations",
            accessor:"ord_observations",
            headerClassName: 'bolder alignleft',
            Cell:({original}) => {
                return (
                    <div className="break wfull">
                    {
                        original.ord_observations
                            ? original.ord_observations
                            : "No observations made"
                    }
                    </div>
                )
            }
        },
        {
            Header: "Items",
            accessor:"items",
            headerClassName: 'bolder alignleft',
            Cell:({original}) => {
                const {items} = original;
                return(
                    <ul className="vlist">
                        <span className="iblock">
                        {items.map(
                            (e,i) => (
                                <span key={i}
                                    className="bolder srmargin iblock stext break"
                                    style={{padding:"0px 5px"}}>
                                        &#10799;{`${e.om_quantity} ${e.name}`}
                                        {i<items.length-1 ? ', ' : '.'}
                                </span>
                            )
                        )}
                        </span>
                    </ul>
                )
            }
        },*/
        ];

}

function varStr(arr,access){
    return arr.reduce(
        (t,e,i) => `${t}${e[access]}${i>=arr.length-1 ? '. ' : ', '}`,""
    )
}

export function itemColumns({ord_currency,ord_convertion}){
    return [
        {
            Header: "",
            maxWidth:70,
            Cell:({original}) => {
                const {men_picture} = original
                return (
                    <div className="aligncenter">
                        <img
                            width={WIDTH}
                            src={`${RESOURCE_URL}${men_picture}`}/>
                    </div>
                )
            }
        },{
            Header: "Item",
            headerClassName: 'bolder alignleft',
            accessor:"description",
            minWidth:150,
            Cell:({original}) => {
                const {name,description,variations,om_quantity,extras} = original
                return (
                    <div className="break">
                        <div>
                            <div className="bolder">
                                {`${name} `}
                                <i className="fas fa-times"></i>
                                <span className="shmargin">{om_quantity}</span>
                            </div>
                            <div>{description}</div>
                            {
                                extras.length>0
                                ?(
                                    <span>
                                        <span className="bolder">Extras:</span>
                                        {` ${varStr(extras||[],'ext_name')}`}
                                    </span>
                                ):
                                ""
                            }
                            <div>
                                <Variations data={variations}/>
                            </div>
                        </div>
                    </div>
                )
            }
        },{
            Header: "Total",
            headerClassName: 'bolder alignleft',
            maxWidth:120,
            Cell:({original}) => {
                return (
                    <div className="alignleft wfull">
                        <Price
                            text=""
                            price={getItemTotal(original,ord_convertion)}
                            currency={ord_currency}/>
                    </div>
                )
            }
        }
        /*{
            Header: "Item Name",
            headerClassName: 'bolder alignleft',
            accessor:"name",
        },{
            Header: "",
            accessor:"om_quantity",
            headerClassName: 'bolder alignleft',
            maxWidth:30,
            Cell:({original}) => {
                return <div className="alignright wfull"></div>;
            }
        },{
            Header: "Base price",
            accessor:"om_price",
            headerClassName: 'bolder alignright',
            maxWidth:120,
            Cell:({original}) => {
                return (
                    <div className="alignright wfull">
                        <Price
                            text=""
                            price={original.om_price*ord_convertion}
                            currency={ord_currency}/>
                    </div>
                )
            }
        }*/
    ];
}
