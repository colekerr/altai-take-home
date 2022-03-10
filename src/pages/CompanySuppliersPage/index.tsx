import React from "react";
import { Route, Switch } from "react-router-dom";

import CompanySearch from "../../components/CompanySearch";
import NetworkGraph from "../../components/NetworkGraph";

import css from "./index.module.css";

function CompanySuppliersPage() {
  return (
    <Switch>
      <Route path="/:companyID">
        <main className={css.layoutWrapper}>
          <section className={css.leftPane}>
            <CompanySearch />
          </section>
          <aside className={css.rightPane}>
            <NetworkGraph />
          </aside>
        </main>
      </Route>
    </Switch>
  );
}

export default CompanySuppliersPage;
