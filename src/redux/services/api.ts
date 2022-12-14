import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CreateUserTypeProps,
  MessagesTypeProps,
  UserTypeProps,
} from "../../types";
import { RootState } from "../store";

export const Api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://taskedtas-api.onrender.com/",
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  reducerPath: "Api",

  endpoints: (build) => ({
    postCreateUser: build.mutation({
      query: (body: CreateUserTypeProps) => {
        return {
          url: "user",
          method: "POST",
          body,
        };
      },
    }),
    postUser: build.mutation({
      query: (arg: UserTypeProps) => {
        return {
          url: "auth",
          method: "POST",
          body: arg,
          Headers,
        };
      },
    }),
    getUser: build.query<any, void>({
      query: () => "user",
      keepUnusedDataFor: 5,
    }),
    getMessagesRefetch: build.mutation({
      query: (arg: string) => {
        return {
          url: `messages/${arg}`,
          method: "GET",
        };
      },
    }),
    postMessages: build.mutation({
      query: (arg: MessagesTypeProps) => {
        return {
          url: `messages/${arg.userId}`,
          method: "POST",
          body: arg,
        };
      },
    }),
    putMessages: build.mutation({
      query: (arg) => {
        return {
          url: `messages/${arg.userId}/${arg.id}`,
          method: "PUT",
          body: arg,
        };
      },
    }),
    destroyMessages: build.mutation({
      query: (arg: MessagesTypeProps) => {
        return {
          url: `messages/${arg.id}`,
          method: "DELETE",
          body: arg,
        };
      },
    }),
  }),
});

export const {
  usePostCreateUserMutation,
  usePostUserMutation,
  useGetUserQuery,
  useDestroyMessagesMutation,
  usePostMessagesMutation,
  usePutMessagesMutation,
  useGetMessagesRefetchMutation,
} = Api;
