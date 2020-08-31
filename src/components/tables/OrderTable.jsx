import React from 'react';
import{
    round
} from '../../helper/helperIndex.jsx';
import ReactTable from "react-table-v6";


const MAX_ROWS = 8;

const orderColumns = [{
        Header: "ID",
        accessor:"ord_id",
        headerClassName: 'bolder alignleft'
    },{
        Header: "Shop",
        accessor:"ord_shop",
        headerClassName: 'bolder alignleft'
    },{
        Header: "Date",
        accessor:"ord_date",
        headerClassName: 'bolder alignleft'
    },{
        Header: "Delivery Address",
        accessor:"ord_cli_address",
        headerClassName: 'bolder alignleft',
        maxWidth:200,
        Cell:({original}) => {
            return <div className="break wfull">{original.ord_cli_address}</div>
        }
    },{
        Header: "Observations",
        accessor:"ord_observations",
        minWidth:200,
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
    },{
        Header: "Shop Currency",
        accessor:"ord_shop_currency",
        headerClassName: 'bolder alignleft',
        Cell:({original}) => {
            return <div className="bolder alignright wfull">{original.ord_shop_currency}</div>
        }
    },{
        Header: "Currency",
        accessor:"ord_currency",
        headerClassName: 'bolder alignleft',
        Cell:({original}) => {
            return <div className="alignright wfull bolder selected">{original.ord_currency}</div>
        }
    },{
        Header: "Conversion rate",
        accessor:"ord_conversion",
        headerClassName: 'bolder alignleft',
        Cell:({original}) => {
            return <div className="alignright wfull">{original.ord_conversion}</div>
        }
    },{
        Header: "Shipping",
        accessor:"ord_shipping",
        headerClassName: 'bolder alignleft',
        Cell:({original}) => {
            return <div className="alignright wfull">{original.ord_shipping}</div>
        }
    },{
        Header: "Total",
        accessor:"ord_total",
        headerClassName: 'bolder alignright',
        Cell:({original}) => {
            return <div className="alignright wfull">{original.ord_total}</div>
        }
    }
];

function displayCurrency(text,price,curr){
    return (
        <>
            <span>{text}</span>
            <span className="shmargin bolder">+{round(price)}</span>
            <span className="bolder selected">{curr}</span>
        </>
    )
}

function itemColumns({ord_currency,ord_conversion}){
    return [{
            Header: "Item Name",
            headerClassName: 'bolder alignleft',
            accessor:"name",
        },{
            Header: "Description",
            headerClassName: 'bolder alignleft',
            accessor:"description",
            minWidth:150,
            Cell:({original}) => <div className="break">{original.description}</div>
        },{
            Header: "Variations",
            accessor:"var_name",
            headerClassName: 'bolder alignleft',
            Cell:(props) => {
                const {original} = props,
                    {variations} = original;
                return variations.length>0
                    ?
                    <ul className="vlist">
                        {variations.map(
                            (e,i) => (
                                <span key={i}
                                    className="bolder srmargin iblock variation stext"
                                    style={{padding:"0px 5px"}}>
                                    {
                                        displayCurrency(
                                            e.var_name,
                                            e.var_price*ord_conversion,
                                            ord_currency
                                        )
                                    }
                                </span>

                            )
                        )}
                    </ul>
                    : <span className="bolder">No variations selected</span>
            }
        },{
            Header: "Extras",
            accessor:"ext_name",
            headerClassName: 'bolder alignleft',
            Cell:(props) => {
                const {original} = props,
                    {extras} = original;
                return extras.length>0
                    ?
                    <ul className="vlist">
                        {extras.map(
                            (e,i)=> (
                                <li key={i}
                                    className="bolder srmargin extra iblock variation stext"
                                    style={{padding:"0px 5px"}}>
                                    {
                                        displayCurrency(
                                            e.ext_name,
                                            e.ext_price*ord_conversion,
                                            ord_currency
                                        )
                                    }
                                </li>
                            )
                        )}
                    </ul>
                    : <span className="bolder">No extra ingredients selected</span>
            }
        },{
            Header: "Quantity",
            accessor:"om_quantity",
            headerClassName: 'bolder alignleft',
            maxWidth:80,
            Cell:({original}) => {
                return <div className="alignright wfull">&#10799;{original.om_quantity}</div>;
            }
        },{
            Header: "Base price",
            accessor:"om_price",
            headerClassName: 'bolder alignright',
            maxWidth:120,
            Cell:({original}) => {
                return (
                    <div className="alignright wfull">
                        {
                            displayCurrency(
                                "",
                                original.om_price*ord_conversion,
                                ord_currency
                            )
                        }
                    </div>
                )
            }
        }
    ];
}

export default function OrderTable({data}){
    const orders = data.orders;
    return (
        <div>
            <ReactTable
                data={orders}
                columns={orderColumns}
                defaultPageSize={orders.length<MAX_ROWS ? orders.length : MAX_ROWS}
                SubComponent={
                    row => {
                        const {items,ord_currency,ord_conversion} = row.original;
                        return (
                            <div>
                                <ReactTable
                                    data={items}
                                    columns={itemColumns({ord_currency,ord_conversion})}
                                    showPagination={false}
                                    defaultPageSize={items.length<MAX_ROWS ? items.length : MAX_ROWS}
                                    />

                            </div>
                        )
                    }
                }/>
        </div>
    );
}
