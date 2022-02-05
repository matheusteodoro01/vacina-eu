import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register'
import Agendar from './pages/Agendar'
import Profile from './pages/Profile'
import NewIncident from './pages/NewIncident'
export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register}/>
                <Route path="/agendar" component={Agendar}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/incidents/new" component={NewIncident}/>
            </Switch>
        </BrowserRouter>);
}