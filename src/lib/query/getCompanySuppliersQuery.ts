import axios, { AxiosPromise } from "axios";

import { ATLAS_API_BASE_URL } from "./constants";

type CompanySuppliersQueryResponse = {
  data: {
    edges: {
      company_canon_ids: string[];
      edge_type: string; // TODO: make into string literal including "trading_partners"
    }[]
  }
}

const getCompanySuppliersQuery = (id: string): AxiosPromise<unknown> => {
  return axios({
    url: `${ATLAS_API_BASE_URL}/company/id/${id}/trading-partners`,
    headers: {
      "X-API-Key": process.env.REACT_APP_ATLAS_API_KEY || "",
    },
  });
};

export const parseCompanySuppliersQueryResponse = (response: CompanySuppliersQueryResponse): string[] => {
  const tradingPartners = (response?.data?.edges || []).find((curEdges) => {
    return curEdges.edge_type === "trading_partners"
  })?.company_canon_ids || [];

  console.log('parseCompanySuppliersQueryResponse tradingPartners', tradingPartners);
  return tradingPartners;
};
export default getCompanySuppliersQuery;
