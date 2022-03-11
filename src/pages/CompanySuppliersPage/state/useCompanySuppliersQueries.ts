import { Dispatch, useEffect } from "react";
import { useParams } from "react-router-dom";

import getCompanySearchQuery, {parseCompanySearchQueryResponse} from "../../../lib/query/getCompanySearchQuery";
import getCompanySuppliersQuery, { parseCompanySuppliersQueryResponse } from "../../../lib/query/getCompanySuppliersQuery";

import useCompanySuppliersReducer, {
  CompanySuppliersReducerState,
  CompanySuppliersReducerAction,
} from "./useCompanySuppliersReducer";

const useCompanySuppliersQueries = (): [
  CompanySuppliersReducerState,
  Dispatch<CompanySuppliersReducerAction>
] => {
  console.log("useCompanySuppliersQueries")
  const [state, dispatch] = useCompanySuppliersReducer();

  const { companyID } = useParams<{ companyID: string }>();

  useEffect(() => {
    if (!state.searchCompanyName) {
      return;
    }
    console.log("useCompanySuppliersQueries useEffect[companyID] state.searchCompanyName", state.searchCompanyName);

    dispatch({
      type: "SEARCH_COMPANY_NAME_QUERY_PENDING",
    });

    // TODO: make promises trashable
    // TODO: fix type of data
    getCompanySearchQuery(state.searchCompanyName)
      .then((resp: any) => {
        const companies = parseCompanySearchQueryResponse(resp);

        dispatch({
          type: "SEARCH_COMPANY_NAME_QUERY_SUCCESS",
          payload: {
            data: companies,
          },
        });
      })
      .catch((err: string) => {
        dispatch({
          type: "SEARCH_COMPANY_NAME_QUERY_FAILED",
          payload: {
            error: err as string, //TODO: normalize runtime type of error
          },
        });
      });
  }, [state.searchCompanyName]);

  useEffect(() => {
    console.log("useCompanySuppliersQueries useEffect[companyID] companyID", companyID);
    if (!companyID) {
      return;
    }
    dispatch({
      type: "COMPANY_SUPPLIERS_QUERY_PENDING",
    });
    // TODO: make promises trashable
    // TODO: fix type of data
    getCompanySuppliersQuery(companyID)
      .then((data: any) => {
        const companyIDs = parseCompanySuppliersQueryResponse(data)
        console.log("useCompanySuppliersQueries useEffect[companyID] getCompanySuppliersQuery.then companyIDs", companyIDs)
        dispatch({
          type: "COMPANY_SUPPLIERS_QUERY_SUCCESS",
          payload: {
            data: companyIDs
          },
        });
      })
      .catch((err: string) => {
        dispatch({
          type: "COMPANY_SUPPLIERS_QUERY_FAILED",
          payload: {
            error: err as string, //TODO: normalize runtime type of error
          },
        });
      });
  }, [companyID])
  return [state, dispatch];
};

export default useCompanySuppliersQueries;
