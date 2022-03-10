import { Dispatch, useEffect } from "react";

import getCompanySearchQuery from "../../../lib/query/getCompanySearchQuery";

import useCompanySuppliersReducer, {
  CompanySuppliersReducerState,
  CompanySuppliersReducerAction,
} from "./useCompanySuppliersReducer";

const useCompanySuppliersQueries = (): [
  CompanySuppliersReducerState,
  Dispatch<CompanySuppliersReducerAction>
] => {
  const [state, dispatch] = useCompanySuppliersReducer();

  useEffect(() => {
    if (!state.searchCompanyName) {
      return;
    }
    dispatch({
      type: "SEARCH_COMPANY_NAME_QUERY_PENDING",
    });

    // TODO: make promises trashable
    // TODO: fix type of data
    getCompanySearchQuery(state.searchCompanyName)
      .then((data: any) => {
        dispatch({
          type: "SEARCH_COMPANY_NAME_QUERY_SUCCESS",
          payload: {
            data,
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

  // FIXME: implement routing-based useEffect and implement getCompanySuppliersQuery

  return [state, dispatch];
};

export default useCompanySuppliersQueries;
