import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes'
import 'babel-polyfill';

ReactDOM.render(
    <BrowserRouter>
        <Routes />
    </BrowserRouter>,
    document.getElementById('root')
);

// const render = Component => {
//     return ReactDOM.render(
//         <HashRouter>
//             <Routes />
//         </HashRouter>,
//         document.getElementById('root')
//     );
// };

// render(App);