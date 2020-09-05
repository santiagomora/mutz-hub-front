import React from 'react';

import {itemColumns,Columns} from './Columns.jsx';

import ReactTable from "react-table-v6";

export function OrderTable({
    data,
    clickHandler
}){
    const orders = data.orders||[];
    return (
        <div>
            <ReactTable
                data={orders}
                columns={Columns(clickHandler)}
                defaultPageSize={orders.length>=5 ? 5 : orders.length}
                sorted={[{id:'ord_date',desc: true }]}/>
        </div>
    );
}

export function ItemTable ({
    items,
    ord_currency,
    ord_convertion
}){
    const it = items||[];
    return (
        <div>
            <ReactTable
                data={items}
                columns={itemColumns({ord_currency,ord_convertion})}
                showPagination={false}
                defaultPageSize={it.length>=5 ? 5 : it.length}/>
        </div>
    )
}
