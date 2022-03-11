import React from "react";
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";

import CompanySearch from "../../components/CompanySearch";
import NetworkGraph from "../../components/NetworkGraph";

import useCompanySearchQuery from "./state/useCompanySuppliersQueries";
import css from "./index.module.css";

const CompanySuppliersContent = () => {
  const [state, dispatch] = useCompanySearchQuery();
  const params = useParams<{ companyID: string }>();

  return (
    <main className={css.layoutWrapper}>
      <section className={css.leftPane}>
        <CompanySearch
          searchCompanyResults={state.searchCompanyResults}
          setSearchCompanyName={(name: string) =>
            // TODO: debounce?
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
      {params.companyID && (
        <aside className={css.rightPane}>
          <NetworkGraph
            tierZeroSupplierIDs={state.tierZeroSuppliersResults.data}
            tierOneSupplierIDs={state.tierOneSuppliersResults.data}
          />
        </aside>
      )}
    </main>
  );
};

const CompanySuppliersPage = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}/:companyID`}>
        <CompanySuppliersContent />
      </Route>
      <Route path={`${match.path}`}>
        <CompanySuppliersContent />
      </Route>
    </Switch>
  );
};

export default CompanySuppliersPage;
