import React from 'react';

function noMemoCheckBox({
    name,
    combo,
    selected,
    title,
    value,
    category,
    handler,
    display,
    price
}) {
    const type = combo ? "combo" : "radio",
        selcombo = selected ? "mback" : "gback",
        selborder = selected ? "mborder" : "gborder",
        comboClass = `${type} ${selcombo}`;
    return (
        <div className="smargin">
            <button
                name={name}
                type={type}
                category={category}
                onClick={handler}
                value={value}
                title={title}
                price={price}
                className={`wfull alignleft ${selborder}`}
                style={{padding:"10px"}}>
                <div className={`${comboClass} shmargin iblock vmiddle`}/>
                <span className="ninety iblock vmiddle shmargin">{display}</span>
            </button>
        </div>
    );
}
export const CheckBox = React.memo(noMemoCheckBox);
