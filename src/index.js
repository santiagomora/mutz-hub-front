import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import ReactDOM from 'react-dom';
import Control from './main/Control.jsx';
import * as serviceWorker from './serviceWorker';
import bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import 'react-table-v6/react-table.css'
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';

ReactDOM.render(
    <Router
        basename='/'>
        <Control requestOnMount/>
    </Router>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
