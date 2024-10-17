import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../utils/baseUrl.js'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/api`,
    credentials: 'include'
  }),
  endpoints: (builder) => ({

    userSignup: builder.mutation({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: userData
      }),
      invalidatesTags: ['User']
    }),

    usersignin: builder.mutation({
      query: (userData) => ({
        url: '/login',
        method: 'POST',
        body: userData
      }),
      invalidatesTags: ['User']
    }),

    userLogout: builder.mutation({
      query: ({ id }) => ({
        url: `/logout/${id}`,
        method: 'POST'
      }),
      invalidatesTags: ['User']
    })
  })
})


export const { useUserSignupMutation, useUsersigninMutation, useUserLogoutMutation } = authApi;