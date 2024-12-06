import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/baseUrl";

const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}api/orders`,
    credentials: "include",
  }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    // Fetch all orders
    getOrdersByEmail: builder.query({
      query: (email) => ({
        url: `/${email}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    // Fetch order by ID
    getOrderById: builder.query({
      query: (orderId) => ({
        url: `/order/${orderId}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    // Get all orders
    getAllOrders: builder.query({
      query: () => ({
        url: ``,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    // update order status
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/update-order-status/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Order"],
    }),
    // delete order
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/delete-order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetOrdersByEmailQuery,
  useGetOrderByIdQuery,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} = orderApi;

export default orderApi;
