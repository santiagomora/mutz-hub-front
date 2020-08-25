import React from 'react';
import {
    Redirect
} from 'react-router-dom';

import {GET} from '../../components/api.jsx';

export default function DashBoard( props ) {
    return (
        <>
            <div>dashboard</div>
            <button onClick={
                er => {
                    er.preventDefault();
                    retrieve();
                }
            }>get credentials </button>
        </>
    )
}
