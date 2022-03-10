import React from 'react';
import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import CompanySuppliersPage from './pages/CompanySuppliersPage';

const COMPANY_SUPPLIERS_ROUTE = "/company-suppliers"

function App() {
  return (
    <Router>
      <Switch>
        <Route path={COMPANY_SUPPLIERS_ROUTE}>
          <CompanySuppliersPage />
        </Route>
        <Route exact path="/">
          <Redirect to={COMPANY_SUPPLIERS_ROUTE} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
