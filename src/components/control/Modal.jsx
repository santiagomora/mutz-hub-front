import React, {
    Component
} from 'react';

import ReactModal from 'react-modal';

const customStyles = {
    content : {
        top     : '2.5vh',
        padding:"10px",
        right   : 'auto',
        bottom  : 'auto',
        maxHeight: '95vh',
        borderRadius:"5px",
        border:"solid 1px var(--lgray)",
        backgroundColor:"white",
        zIndex:999999
    }
};

export default function Modal(props) {
    return(
        <ReactModal
            ariaHideApp={false}
            isOpen={props.show}
            className="container-fluid col-xs-11 col-md-10 col-lg-8 col-sm-11 shadow nopadding"
            style = {customStyles}>
            {props.children}
        </ReactModal>
    );
}
