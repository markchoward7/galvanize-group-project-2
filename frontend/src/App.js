import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import './App.css';

import Home from './components/Home'
import NewTasking from './components/NewTasking'
import NewUser from './components/NewUser'
import Sidebar from './components/Sidebar'
import TaskingDetail from './components/TaskingDetail'
import UserList from './components/UserList'
import UserDetail from './components/UserDetail'
import UpdateTasking from './components/UpdateTasking'
import UpdateUser from './components/UpdateUser'

const axios = require('axios').default
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.put['Content-Type'] = 'application/json'
axios.defaults.headers.patch['Content-Type'] = 'application/json'

function App() {
  return (
    <Router><div className="App">
      <Sidebar />
      <div className="main">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/taskings/create" component={NewTasking} />
          <Route exact path="/taskings/:id" component={TaskingDetail} />
          <Route exact path="/taskings/:id/update" component={UpdateTasking} />
          <Route exact path="/users" component={UserList} />
          <Route exact path="/users/create" component={NewUser} />
          <Route exact path="/users/:id" component={UserDetail} />
          <Route exact path="/users/:id/update" component={UpdateUser} />
        </Switch>  
      </div>  
    </div></Router>
  );
}

export default App;
