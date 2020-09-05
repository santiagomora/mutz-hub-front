import React, {
    Component
} from 'react';
import {
    CheckBox
} from '../../../../components/input/CheckBox.jsx';
import {
    round,
    searchItem,
    Price
} from '../../../../helper/helperIndex.jsx';

export default function DisplayExtras({
    extras,
    form,
    shop,
    crr,
    handler,
    convert
}){
    return (
        <>
        {
            extras.map(
                (ex,i) => {
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
                                    <div className="iblock fifty alignright">
                                        <Price
                                            text={<span className="bolder">charge:</span>}
                                            price={convert(shop.currency,ex.price)}
                                            currency={crr}
                                            withSum/>
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
