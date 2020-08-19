import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';

import ReactModal from 'react-modal';

const customStyles = {
    content : {
        top     : '5%',
        left    : '15%',
        right   : 'auto',
        bottom  : 'auto',
        width   : '70%',
        maxHeight: '90%'
    }
};

export default function Modal(props) {
    return(
        <ReactModal
            ariaHideApp={false}
            isOpen={props.show}
            style = {customStyles}>
            {props.children}
        </ReactModal>
    );
}
