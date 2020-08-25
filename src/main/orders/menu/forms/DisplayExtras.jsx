import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import {
    CheckBox
} from '../../../../components/input/CheckBox.jsx';
import {
    currencyChange
} from '../../../../components/helper/currencyChange.jsx';
import {
    searchItem
} from '../../../../components/helper/searchItem.jsx';

export default function DisplayExtras({
    extras,
    change,
    form,
    shop,
    handler
}){
    return (
        <>
        {
            extras.map(
                (ex,i) => {
                    const [crr,pri] =  currencyChange({
                        price:ex.price,
                        shop:shop.currency,
                        ...change
                    });
                    return(
                        <CheckBox
                            key={i}
                            combo
                            selected={searchItem(form.extras,ex.id) !== -1}
                            handler={handler}
                            value={ex.id}
                            price={ex.price}
                            display={
                                <>
                                    <div className="iblock fifty">
                                        <p className="nomargin bolder">{ex.name}</p>
                                        <p className="nomargin">{ex.description}</p>
                                    </div>
                                    <div className="iblock fifty">
                                        <p className="alignright vmiddle nomargin wfull">
                                            <span className="shmargin"><span className="bolder">+</span>{pri}</span>
                                            <span className="selected">{crr}</span>
                                        </p>
                                    </div>
                                </>
                            }
                            title={ex.name}/>
                    )
                }
            )
        }
        </>
    );
}
