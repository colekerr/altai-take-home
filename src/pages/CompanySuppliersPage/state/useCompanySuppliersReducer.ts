import { useReducer } from "react";

export type CompanySuppliersReducerAction =
  | {
      type: "SET_SEARCH_COMPANY_NAME";
      payload: Pick<CompanySuppliersReducerState, "searchCompanyName">;
    }
  | {
      type: "SEARCH_COMPANY_NAME_QUERY_PENDING";
    }
  | {
      type: "SEARCH_COMPANY_NAME_QUERY_SUCCESS";
      payload: Pick<
        CompanySuppliersReducerState["searchCompanyResults"],
        "data"
      >;
    }
  | {
      type: "SEARCH_COMPANY_NAME_QUERY_FAILED";
      payload: Pick<
        CompanySuppliersReducerState["searchCompanyResults"],
        "error"
      >;
    }
  | {
      type: "COMPANY_SUPPLIERS_QUERY_PENDING";
    }
  | {
      type: "COMPANY_SUPPLIERS_QUERY_SUCCESS";
      payload: Pick<
        CompanySuppliersReducerState["companySuppliersResults"],
        "data"
      >;
    }
  | {
      type: "COMPANY_SUPPLIERS_QUERY_FAILED";
      payload: Pick<
        CompanySuppliersReducerState["companySuppliersResults"],
        "error"
      >;
    };

export type CompanySuppliersReducerState = {
  searchCompanyName: string;
  searchCompanyResults: {
    isLoading: boolean;
    data: any[]; // FIXME: change type
    error?: string;
  };
  companySuppliersResults: {
    isLoading: boolean;
    data: any[]; // FIXME: change type
    error?: string;
  };
};

const _reducer = (
  curState: CompanySuppliersReducerState,
  action: CompanySuppliersReducerAction
) => {
  const { type } = action;

  switch (type) {
    case "SET_SEARCH_COMPANY_NAME": {
      return {
        ...curState,
        searchCompanyName: action.payload.searchCompanyName,
      };
    }
    case "SEARCH_COMPANY_NAME_QUERY_PENDING": {
      return {
        ...curState,
        searchCompanyResults: {
          ...curState.searchCompanyResults,
          isLoading: true,
        },
      };
    }
    case "SEARCH_COMPANY_NAME_QUERY_SUCCESS": {
      return {
        ...curState,
        searchCompanyResults: {
          error: undefined,
          data: action.payload.data,
          isLoading: false,
        },
      };
    }
    case "SEARCH_COMPANY_NAME_QUERY_FAILED": {
      return {
        ...curState,
        searchCompanyResults: {
          error: action.payload.error,
          data: [],
          isLoading: false,
        },
      };
    }
    case "COMPANY_SUPPLIERS_QUERY_PENDING": {
      return {
        ...curState,
        companySuppliersResults: {
          ...curState.companySuppliersResults,
          isLoading: true,
        },
      };
    }
    case "COMPANY_SUPPLIERS_QUERY_SUCCESS": {
      return {
        ...curState,
        companySuppliersResults: {
          error: undefined,
          data: action.payload.data,
          isLoading: false,
        },
      };
    }
    case "COMPANY_SUPPLIERS_QUERY_FAILED": {
      return {
        ...curState,
        companySuppliersResults: {
          error: action.payload.error,
          data: [],
          isLoading: false,
        },
      };
    }
    default: {
      console.error("Unknown CompanySuppliersReducerAction", type);

      return curState;
    }
  }
};

export const DEFAULT_NETWORK_GRAPH_REDUCER_STATE: CompanySuppliersReducerState =
  {
    searchCompanyName: "",
    searchCompanyResults: {
      isLoading: false,
      data: [],
    },
    companySuppliersResults: {
      isLoading: false,
      data: [],
    },
  };

const useCompanySuppliersReducer = () => {
  return useReducer(_reducer, DEFAULT_NETWORK_GRAPH_REDUCER_STATE);
};

export default useCompanySuppliersReducer;
