import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import Routes from './routes'
ReactDOM.render(
    <HashRouter>
        <Routes />
    </HashRouter>,
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