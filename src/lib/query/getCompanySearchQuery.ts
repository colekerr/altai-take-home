import axios, { AxiosPromise } from "axios";

import { ATLAS_API_BASE_URL } from "./constants";

const getCompanySearchQuery = (name: string): AxiosPromise<unknown> => {
  console.log('getCompanySearchQuery axios url', `${ATLAS_API_BASE_URL}/company/search/${name}`)
  return axios({
    url: `${ATLAS_API_BASE_URL}/company/search/${name}`,
    headers: {
      "X-API-Key": process.env.REACT_APP_ATLAS_API_KEY || "",
    },
  });
};

export default getCompanySearchQuery;
