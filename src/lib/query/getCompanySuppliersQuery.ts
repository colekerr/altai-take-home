import axios, { AxiosPromise } from "axios";

import { ATLAS_API_BASE_URL } from "./constants";

const getCompanySuppliersQuery = (id: string): AxiosPromise<unknown> => {
  return axios({
    url: `${ATLAS_API_BASE_URL}/company/id/${id}/trading-partners`,
    headers: {
      "X-API-Key": process.env.REACT_APP_ATLAS_API_KEY || "",
    },
  });
};

export default getCompanySuppliersQuery;
