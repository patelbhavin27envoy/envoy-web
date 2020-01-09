import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';

import { Search, VisitorForm } from './components';
import  store from  './stores';
import { entryService } from './services';

import './index.scss'

class App extends React.Component {

    render() {
        return (
              <Router>
                  <div className="container mx-auto mt-12 p-8 border  min-h-screen max-w-3xl">
                      <Switch>
                          <Route exact path="/" component={Search} />
                          <Route path="/visitor" component={VisitorForm} />
                      </Switch>
                  </div>
              </Router>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)
