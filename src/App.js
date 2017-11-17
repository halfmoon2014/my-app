import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {render} from 'react-dom';
import Test2 from './Test2';

// 首先我们需要导入一些组件...

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
function formatName(user) {
    return user.firstName + ' ' + user.lastName;
}

const user = {
    firstName: 'Harper',
    lastName: 'Perez'
};
const element = <p tabIndex="0" data-hel="0">Hello, world! app.js{formatName(user)}</p>;

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>{element}</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <div>
                    <li><Link to="/test">test</Link></li>
                    <li><Link to="/test2">test2</Link></li>

                    <Route path="/test" component={Test2}/>
                    <Route path="/test2" component={Test2}/>
                </div>
            </div>
        );
    }
}


//
// const routes = {
//     path: '/',
//     component: App,
//     childRoutes: [
//         { path: 'test', component: ProductRow },
//         { path: 'test2', component: ProductRow },
//     ]
// }
// React.render(<Router routes={routes} />, document.body)

export default App;
