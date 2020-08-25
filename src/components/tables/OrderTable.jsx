import React from 'react'
import ReactTable from "react-table-v6";

const MAX_ROWS = 8;

const orderColumns = [{
        Header: "ID",
        accessor:"ord_id"
    },{
        Header: "Shop",
        accessor:"ord_shop",
    },{
        Header: "Observations",
        accessor:"ord_observations",
    },{
        Header: "Delivery Address",
        accessor:"ord_cli_address",
    },{
        Header: "Client Phone",
        accessor:"ord_cli_telephone",
    },{
        Header: "Client Name",
        accessor:"ord_cli_name",
    },{
        Header: "Client Email",
        accessor:"ord_cli_email",
    },{
        Header: "Date",
        accessor:"ord_date",
    },{
        Header: "Total",
        accessor:"ord_total",
    },{
        Header: "Currency",
        accessor:"ord_currency",
    }
];

const itemColumns = [{
        Header: "Item Name",
        accessor:"name",
    },{
        Header: "Description",
        accessor:"description",
    },{
        Header: "Quantity",
        accessor:"om_quantity",
    },{
        Header: "Price",
        accessor:"om_price",
    }
];

const variationColumns = [{
        Header: "Variation Name",
        accessor:"var_name",
    },{
        Header: "Description",
        accessor:"var_description",
    },{
        Header: "Type",
        accessor:"var_type",
    },{
        Header: "Price",
        accessor:"var_price",
    }
];

const extraColumns = [{
        Header: "Extra Name",
        accessor:"ext_name",
    },{
        Header: "Description",
        accessor:"ext_description",
    },{
        Header: "Price",
        accessor:"ext_price",
    }
];

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
                        const {items} = row.original;
                        return (
                            <div>
                                <ReactTable
                                    data={items}
                                    columns={itemColumns}
                                    showPagination={false}
                                    defaultPageSize={items.length<MAX_ROWS ? items.length : MAX_ROWS}
                                    SubComponent={
                                        row => {
                                            const {variations,extras} = row.original;
                                            return(
                                                <>
                                                    {
                                                        variations.length>0
                                                            ? <ReactTable
                                                                data={variations}
                                                                columns={variationColumns}
                                                                showPagination={false}
                                                                defaultPageSize={
                                                                    variations.length<MAX_ROWS
                                                                    ? variations.length
                                                                    : MAX_ROWS}/>
                                                            : <></>
                                                    }
                                                    {
                                                        extras.length>0
                                                        ? <ReactTable
                                                                data={extras}
                                                                columns={extraColumns}
                                                                showPagination={false}
                                                                defaultPageSize={
                                                                    extras.length<MAX_ROWS
                                                                    ? extras.length
                                                                    : MAX_ROWS}/>
                                                        : <></>
                                                    }
                                                </>
                                            )
                                        }
                                    }/>

                            </div>
                        )
                    }
                }/>
        </div>
    );
}
