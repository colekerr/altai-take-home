import React from "react";
import { Route, Switch } from "react-router-dom";

import CompanySearch from "../../components/CompanySearch";
import NetworkGraph from "../../components/NetworkGraph";

import useCompanySearchQuery from "./state/useCompanySuppliersQueries";
import css from "./index.module.css";

const CompanySuppliersPage = () => {
  const [state, dispatch] = useCompanySearchQuery();

  return (
    <Switch>
      <Route path="/:companyID">
        <main className={css.layoutWrapper}>
          <section className={css.leftPane}>
            <CompanySearch
              searchCompanyResults={state.searchCompanyResults}
              setSearchCompanyName={(name: string) =>
                dispatch({
                  type: "SET_SEARCH_COMPANY_NAME",
                  payload: {
                    searchCompanyName: name,
                  },
                })
              }
            />
          </section>
          {/* TODO: Replace NetworkGraph with paginated table of suppliers if results go above certain number */}
          <aside className={css.rightPane}>
            <NetworkGraph />
          </aside>
        </main>
      </Route>
    </Switch>
  );
};

export default CompanySuppliersPage;
