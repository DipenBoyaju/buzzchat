import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../utils/baseUrl.js'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/api`,
    credentials: 'include'
  }),
  endpoints: (builder) => ({

    getUserDetail: builder.query({
      query: (id) => ({
        url: `/userDetail/${id}`,
        method: 'GET',
      }),
      providesTags: ['UserDetail']
    }),
    getAllUserDetail: builder.query({
      query: () => ({
        url: '/getAllUserDetail',
        method: 'GET',
      }),
      providesTags: ['UserDetail']
    }),

    updateUserDetail: builder.mutation({
      query: ({ id, name, email, activeStatus, profile_pic }) => ({
        url: `/updateUserDetail/${id}`,
        method: 'PATCH',
        body: { name, email, activeStatus, profile_pic }
      }),
      invalidatesTags: ['UserDetail']
    }),

    searchUser: builder.query({
      query: (searchTitle) => ({
        url: `/searchUser/${searchTitle}`,
        method: 'GET',
      })
    }),

  })
})


export const { useGetUserDetailQuery, useUpdateUserDetailMutation, useGetAllUserDetailQuery, useSearchUserQuery, useUploadFileMutation } = userApi;