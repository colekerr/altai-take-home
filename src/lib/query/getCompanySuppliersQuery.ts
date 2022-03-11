import axios, { AxiosPromise } from "axios";

import { ATLAS_API_BASE_URL } from "./constants";

type CompanySuppliersQueryResponse = {
  data: {
    companies: {
      altana_canon_id: string;
    }[];
  };
};

const getCompanySuppliersQuery = (id: string): AxiosPromise<unknown> => {
  return axios({
    url: `${ATLAS_API_BASE_URL}/company/id/${id}/trading-partners`,
    headers: {
      "X-API-Key": process.env.REACT_APP_ATLAS_API_KEY || "",
    },
  });
};

export const parseCompanySuppliersQueryResponse = (
  response: CompanySuppliersQueryResponse
): string[] => {
  const tradingPartners = (response?.data?.companies || []).map(
    (curCompany) => {
      return curCompany.altana_canon_id;
    }
  );

  return tradingPartners;
};
export default getCompanySuppliersQuery;
