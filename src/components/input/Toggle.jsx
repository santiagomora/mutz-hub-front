import React from 'react';
/**
 * props
 * @param {*} props
 * component
 */
function noMemoToggle(props) {
    const side = props.side;
    return (
        <div
            className="smargin">
            <span className={side === 1 ? "smargin selected" : "smargin bolder"}>
                {props.leftTitle}
            </span>
            <div className="iblock">
                <div className = {
                    (side === 1)
                        ? "iblock toggle alignleft"
                        : "iblock toggle alignright"
                }>
                    <button className="circle mback"
                        value={side === 1 ? 2 : 1}
                        name={props.name}
                        onClick= {
                            (e) => {
                                e.preventDefault();
                                props.changeSide(
                                    parseInt(
                                        e.currentTarget.getAttribute("value")
                                    )
                                );
                            }
                        }/>
                </div>
            </div>
            <span className={side === 2 ? "smargin selected" : "smargin bolder"}>
                {props.rightTitle}
            </span>
        </div>
    );
}
export const Toggle = React.memo(noMemoToggle);
