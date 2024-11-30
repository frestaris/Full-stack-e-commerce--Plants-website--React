import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/baseUrl";

export const reviewApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}api/reviews`,
    credentials: "include",
  }),
  tagTypes: ["Reviews"],
  endpoints: (builder) => ({
    // Post review
    psotReview: builder.mutation({
      query: (reviewData) => ({
        url: "/post-reviews",
        method: "POST",
        body: reviewData,
        credentials: "include",
      }),
      invalidatesTags: (result, erro, { postId }) => [
        { type: "Reviews", id: postId },
      ],
    }),

    // Get Reviews count
    getReviewCount: builder.query({
      query: () => ({
        url: `/total-reviews`,
      }),
    }),

    // Get Reviews by userId
    getReviewsByUserId: builder.query({
      query: (userId) => ({
        url: `/${userId}`,
      }),
      providesTags: (result) =>
        result ? [{ type: "Reviews", id: result[0]?.email }] : [],
    }),
  }),
});

export const {
  usePsotReviewMutation,
  useGetReviewCountQuery,
  useGetReviewsByUserIdQuery,
} = reviewApi;

export default reviewApi;
