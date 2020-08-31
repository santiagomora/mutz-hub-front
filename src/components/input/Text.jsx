import React from 'react';

export default function Text ({
    title,
    name,
    rows,
    holder,
    value,
    changeHandler,
    errors
}) {
    return (
        <div className="wfull">
            <h6 className="bolder">
                {title}
            </h6>
            <div>
                <input name={name}
                    type="text"
                    className="wfull text"
                    placeholder={holder}
                    onChange={changeHandler}
                    value={value||""}
                    autoComplete="on"/>
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
