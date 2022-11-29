import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CreateUserTypeProps,
  MessagesTypeProps,
  UserTypeProps,
} from "../../types";
import { RootState } from "../store";

export const Api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9009/",
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.token;
      console.log(token);

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      console.log(headers);

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
    getMessages: build.query({
      query: (userId) => `messages/${userId}`,
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
  useGetMessagesQuery,
  useDestroyMessagesMutation,
  usePostMessagesMutation,
  usePutMessagesMutation,
  useGetMessagesRefetchMutation,
} = Api;
