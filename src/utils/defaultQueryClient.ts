import { QueryCache, QueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export const defaultQueryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (err) => {
      if (isAxiosError(err)) {
        if (err?.response?.status === 401 && typeof window !== "undefined") {
          // redirect to sign in page
          // get path from window.location
          window.location.href = `/`;
          return;
        }
        if (err?.response?.status === 400) {
          toast.error(`Validation Error`, {
            id: `validationError`,
          });
          return;
        }
        if (
          err?.response?.status != null &&
          err?.response?.status >= 400 &&
          err?.response?.status < 500
        ) {
          toast.error(err.message ?? "Error", {
            id: "server error",
          });
        }
      }
    },
  }),
});

defaultQueryClient.setDefaultOptions({
  queries: {
    staleTime: 0,
    notifyOnChangeProps: ["data", "error"],
  },
  mutations: {
    onError: (err) => {
      if (isAxiosError(err)) {
        if (err?.response?.status === 401 && typeof window !== "undefined") {
          // redirect to sign in page
          // get path from window.location
          window.location.href = `/`;
          return;
        }
        if (err?.response?.status === 400) {
          toast.error(`Validation Error`, {
            id: `validation-error`,
          });
          return;
        }
        if (
          err?.response?.status != null &&
          err?.response?.status >= 400 &&
          err?.response?.status < 500
        ) {
          toast.error(err?.message ?? "Error", {
            id: "server error",
          });
        }
      }
    },
  },
});

export const isAxiosError = (error: unknown): error is AxiosError => {
  return axios.isAxiosError(error);
};
