import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/baseUrl";

export const statsApi = createApi({
  reducerPath: "statsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}api/stats`,
    credentials: "include",
  }),
  tagTypes: ["Stats"],
  endpoints: (builder) => ({
    // Get stats
    getUserStats: builder.mutation({
      query: (email) => `/user-stats/${email}`,
      providesTags: ["Stats"],
    }),

    // Get admin stats
    getAdminStats: builder.mutation({
      query: () => `/admin-stats`,
      providesTags: ["Stats"],
    }),
  }),
});

export const { useGetUserStatsMutation, useGetAdminStatsMutation } = statsApi;

export default statsApi;
