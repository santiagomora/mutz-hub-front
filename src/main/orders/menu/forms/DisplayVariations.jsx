import React, {
    Component
} from 'react';
import {
    CheckBox
} from '../../../../components/input/CheckBox.jsx';
import {
    round
} from '../../../../helper/helperIndex.jsx';

export default function DisplayVariations({
    variations,
    form,
    shop,
    crr,
    handler,
    convert
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
                                                            <span className="shmargin">
                                                                <span className="bolder">+</span>
                                                                {convert(shop.currency,r.var_price)}
                                                            </span>
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
