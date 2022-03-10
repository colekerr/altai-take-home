import useAxios from "axios-hooks";

import { ATLAS_API_BASE_URL } from "./constants";

const useCompanySuppliersQuery = (id: string): ReturnType<typeof useAxios> => {
  return useAxios({ url: `${ATLAS_API_BASE_URL}/company/id/${id}/trading-partners`, headers: {
    "X-Api-Key": process.env.REACT_APP_ATLAS_API_KEY || ""
  }});

};

export default useCompanySuppliersQuery;