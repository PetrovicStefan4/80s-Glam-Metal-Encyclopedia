import type { AxiosRequestConfig } from "axios";
import { QueryClient } from "react-query";

import api from "./api";

const getQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        queryFn: ({ queryKey }) => {
          const [url, config] = queryKey as
            | [string, AxiosRequestConfig]
            | [string];

          return api
            .get(`/${url}`, { params: config?.params })
            .then(({ data }) => data);
        },
      },
    },
  });
};

export default getQueryClient;
