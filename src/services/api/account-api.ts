import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TLoginForm, TRegisterForm } from "../../models/account";


export const AccountAPI = createApi({
  reducerPath: "accountAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["Account"],
  endpoints: (build) => ({
    login: build.mutation<TLoginForm, Partial<TLoginForm>>({
      query: (body) => ({
        url: "accounts/login",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Account", id: "LIST" }],
    }),
    register: build.mutation<TRegisterForm, Partial<TRegisterForm>>({
      query: (body) => ({
        url: "accounts/register",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Account", id: "LIST" }],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation
} = AccountAPI;
