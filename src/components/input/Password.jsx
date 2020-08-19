import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';

import DisplaysErrors from '../../hocs/DisplaysErrors';

const noMemoPassword = (props) => {
    const hasError = props.hasError;
    return (
        <div className="full-width">
            <h6 className="highlight m-font">
                {props.titulo}
            </h6>
            <div className={
                hasError
                    ? "light-input error-box error"
                    : "light-input "
                }>
                <input type="password"
                    name={props.name}
                    placeholder={props.holder}
                    className={
                        hasError && props.value !==''
                            ? "full-width box-transparent error"
                            : "full-width box-transparent"
                    }
                    autoComplete="off"
                    onChange={props.changeHandler}
                    value={props.value}
                    needsvalue={1}/>
            </div>
        </div>
    );
}


const MemoPassword = React.memo(noMemoPassword);

export const Password = (props) => (
    <DisplaysErrors errors = {props.errors}>
        <MemoPassword rows={props.rows}
            titulo={props.titulo}
            holder={props.holder}
            name={props.name}
            value={props.value}
            changeHandler={props.changeHandler}/>
    </DisplaysErrors>
)
