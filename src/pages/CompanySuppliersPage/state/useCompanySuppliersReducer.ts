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
      type: "TIER_ZERO_SUPPLIERS_QUERY_PENDING";
    }
  | {
      type: "TIER_ZERO_SUPPLIERS_QUERY_SUCCESS";
      payload: Pick<
        CompanySuppliersReducerState["tierZeroSuppliersResults"],
        "data"
      >;
    }
  | {
      type: "TIER_ZERO_SUPPLIERS_QUERY_FAILED";
      payload: Pick<
        CompanySuppliersReducerState["tierZeroSuppliersResults"],
        "error"
      >;
    }
  | {
      type: "TIER_ONE_SUPPLIERS_QUERY_PENDING";
    }
  | {
      type: "TIER_ONE_SUPPLIERS_QUERY_SUCCESS";
      payload: Pick<
        CompanySuppliersReducerState["tierOneSuppliersResults"],
        "data"
      >;
    }
  | {
      type: "TIER_ONE_SUPPLIERS_QUERY_FAILED";
      payload: Pick<
        CompanySuppliersReducerState["tierOneSuppliersResults"],
        "error"
      >;
    };

export type CompanySuppliersReducerState = {
  searchCompanyName: string;
  searchCompanyID: string;
  searchCompanyResults: {
    isLoading: boolean;
    data: any[]; // FIXME: change type
    error?: string;
  };
  tierZeroSuppliersResults: {
    isLoading: boolean;
    data: any[]; // FIXME: change type
    error?: string;
  };
  tierOneSuppliersResults: {
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
    case "TIER_ZERO_SUPPLIERS_QUERY_PENDING": {
      return {
        ...curState,
        tierZeroSuppliersResults: {
          ...curState.tierZeroSuppliersResults,
          isLoading: true,
        },
      };
    }
    case "TIER_ZERO_SUPPLIERS_QUERY_SUCCESS": {
      return {
        ...curState,
        tierZeroSuppliersResults: {
          error: undefined,
          data: action.payload.data,
          isLoading: false,
        },
        tierOneSuppliersResults: {
          isLoading: false,
          data: [],
        },    
      };
    }
    case "TIER_ZERO_SUPPLIERS_QUERY_FAILED": {
      return {
        ...curState,
        tierZeroSuppliersResults: {
          error: action.payload.error,
          data: [],
          isLoading: false,
        },
      };
    }
    case "TIER_ONE_SUPPLIERS_QUERY_PENDING": {
      return {
        ...curState,
        tierOneSuppliersResults: {
          ...curState.tierOneSuppliersResults,
          isLoading: true,
        },
      };
    }
    case "TIER_ONE_SUPPLIERS_QUERY_SUCCESS": {
      return {
        ...curState,
        tierOneSuppliersResults: {
          error: undefined,
          data: action.payload.data,
          isLoading: false,
        },
      };
    }
    case "TIER_ONE_SUPPLIERS_QUERY_FAILED": {
      return {
        ...curState,
        tierOneSuppliersResults: {
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
    searchCompanyID: "",
    searchCompanyResults: {
      isLoading: false,
      data: [],
    },
    tierZeroSuppliersResults: {
      isLoading: false,
      data: [],
    },
    tierOneSuppliersResults: {
      isLoading: false,
      data: [],
    },
  };

const useCompanySuppliersReducer = () => {
  return useReducer(_reducer, DEFAULT_NETWORK_GRAPH_REDUCER_STATE);
};

export default useCompanySuppliersReducer;
