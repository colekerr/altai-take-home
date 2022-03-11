import axios, { AxiosPromise } from "axios";

import { ATLAS_API_BASE_URL } from "./constants";

export type CompanySearchResult = {
  altana_canon_id: string;
  company_name: string;
  supplierIDs: string[];
};

const getCompanySearchQuery = (name: string): AxiosPromise<unknown> => {
  return axios({
    url: `${ATLAS_API_BASE_URL}/company/search/${name}`,
    headers: {
      "X-API-Key": process.env.REACT_APP_ATLAS_API_KEY || "",
    },
  });
};

export const parseCompanySearchQueryResponse = (response: {
  data: string | Record<string, unknown>;
}): any[] => {
  const data = response?.data;

  // TODO: figure out what's wrong with JSON returned when searchCompanyName.length === 1 (e.g. "a")
  const parsedData = typeof data === "string" ? JSON.parse(data) : data;

  return (parsedData?.companies || []).map((curCompany: any) => {
    // TODO: make a type for curCompany
    return {
      altana_canon_id: curCompany.altana_canon_id,
      company_name: curCompany.company_name,
      supplierIDs: curCompany.company_context.suppliers,
    };
  });
};

export default getCompanySearchQuery;
