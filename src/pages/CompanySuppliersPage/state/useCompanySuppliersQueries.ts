import { Dispatch, useEffect } from "react";
import { useParams } from "react-router-dom";

import getCompanySearchQuery, {
  parseCompanySearchQueryResponse,
} from "../../../lib/query/getCompanySearchQuery";
import getCompanySuppliersQuery, {
  parseCompanySuppliersQueryResponse,
} from "../../../lib/query/getCompanySuppliersQuery";
import useQuery from "../../../lib/router/useQuery";

import useCompanySuppliersReducer, {
  CompanySuppliersReducerState,
  CompanySuppliersReducerAction,
} from "./useCompanySuppliersReducer";

const useCompanySuppliersQueries = (): [
  CompanySuppliersReducerState,
  Dispatch<CompanySuppliersReducerAction>
] => {
  const [state, dispatch] = useCompanySuppliersReducer();

  const { companyID } = useParams<{ companyID: string }>();
  const edgeSuppliersID = useQuery() as any;

  console.log("useCompanySuppliersQueries", { edgeSuppliersID });
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
    if (!(companyID || edgeSuppliersID)) {
      return;
    }

    const queryCompanyID = edgeSuppliersID || companyID;
    const queryActionPrefix = `TIER_${
      edgeSuppliersID ? "ONE" : "ZERO"
    }_SUPPLIERS_QUERY`;

    console.log("useCompanySuppliersQueries", { queryActionPrefix });
    dispatch({
      type: `${queryActionPrefix}_PENDING` as any,
    });
    // TODO: make promises trashable
    // TODO: fix type of data
    getCompanySuppliersQuery(queryCompanyID)
      .then((data: any) => {
        const companyIDs = parseCompanySuppliersQueryResponse(data);
        dispatch({
          type: `${queryActionPrefix}_SUCCESS` as any,
          payload: {
            data: companyIDs,
          },
        });
      })
      .catch((err: string) => {
        dispatch({
          type: `${queryActionPrefix}_FAILED` as any,
          payload: {
            error: err as string, //TODO: normalize runtime type of error
          },
        });
      });
  }, [companyID, edgeSuppliersID]);
  return [state, dispatch];
};

export default useCompanySuppliersQueries;
