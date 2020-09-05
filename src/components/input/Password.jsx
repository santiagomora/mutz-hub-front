import React from 'react';

export default function Password({
    title,
    name,
    rows,
    readOnly,
    holder,
    value,
    changeHandler,
    errors
}){
    return (
        <div className="wfull">
            <h6 className="bolder">
                {title}
            </h6>
            <div>
                <input
                    type="password"
                    name={name}
                    placeholder={holder}
                    className="wfull text"
                    onChange={changeHandler}
                    value={value}/>
            </div>
            <div>
                {
                    (errors||[]).length>0
                    ?
                        errors.map(
                            (e,i) => {
                                return (
                                    <div key={i}
                                        className="bolder"
                                        style={{color:"var(--danger)"}}>
                                        {e}
                                    </div>
                                )
                            }
                        )
                    : ""
                }
            </div>
        </div>
    );
}
