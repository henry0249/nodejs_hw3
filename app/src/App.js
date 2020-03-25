import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import {Provider} from 'react-redux';

import theme from './muiTheme';
import store from './store/index';

import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';

function App() {
    return (
        <div>
            <Router>
                <Link to="/login">login</Link>
                <Link to="/register">Register</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Switch>
                    <PublicRoute restricted={true} component={Login} path="/login" exact />
                    <PublicRoute restricted={true} component={Register} path="/register" exact />
                    <PrivateRoute component={Dashboard} path="/dashboard" exact />
                    <Route path="*" component={NotFound}/>
                </Switch>
            </Router>
        </div>
    );
}

const AppProvider = () => (
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <App />
        </Provider>
    </ThemeProvider>
);

export default AppProvider;