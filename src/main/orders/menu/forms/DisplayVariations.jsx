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

export default function DisplayVariations({
    variations,
    change,
    form,
    shop,
    handler
}){
    return (
        Object.keys(variations).map(
            (t,j) => {
                return (
                    <div style={{paddingBottom:"10px"}} key={j}>
                        <h5 className="bolder">{`${t} types:`}</h5>
                        {
                            variations[t].map(
                                (r,i) => {
                                    const [crr,pri] =  currencyChange({
                                        price:r.var_price,
                                        shop:shop.currency,
                                        ...change
                                    });
                                    return(
                                        <CheckBox
                                            key={i}
                                            radio
                                            selected={(form.variations[r.var_type]||{}).var_id  === r.var_id}
                                            handler={handler}
                                            value={r.var_id}
                                            price={r.var_price}
                                            display={
                                                <>
                                                    <div className="iblock fifty">
                                                        <p className="nomargin bolder">{r.var_name}</p>
                                                        <p className="nomargin">{r.var_description}</p>
                                                    </div>
                                                    <div className="iblock fifty">
                                                        <p className="alignright vmiddle nomargin wfull">
                                                            <span className="shmargin"><span className="bolder">+</span>{pri}</span>
                                                            <span className="selected">{crr}</span>
                                                        </p>
                                                    </div>
                                                </>
                                            }
                                            category={r.var_type}
                                            title={r.var_name}/>
                                    )
                                }
                            )
                        }
                    </div>
                )
            }
        )
    );
}
