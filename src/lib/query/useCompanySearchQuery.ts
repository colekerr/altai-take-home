import useAxios from "axios-hooks";

import { ATLAS_API_BASE_URL } from "./constants";

const useCompanySearchQuery = (name: string): ReturnType<typeof useAxios> => {
  return useAxios({ url: `${ATLAS_API_BASE_URL}/company/search/${name}`, headers: {
    "X-Api-Key": process.env.REACT_APP_ATLAS_API_KEY || ""
  }});
};

export default useCompanySearchQuery;
