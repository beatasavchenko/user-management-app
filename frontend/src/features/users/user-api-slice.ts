import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CreateUserDto, EditUserDto, User } from "@shared/types/User.type";

type GetUsersParams = {
    search?: string;
    sortBy?:
        | "customerNumber"
        | "username"
        | "firstName"
        | "lastName"
        | "lastLogin";
    order?: "asc" | "desc";
};

export const userSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/users",
    }),
    tagTypes: ["Users"],
    endpoints(builder) {
        return {
            getUsers: builder.query<User[], GetUsersParams>({
                query: (params) => {
                    const searchParams = new URLSearchParams();
                    if (params?.search)
                        searchParams.append("search", params.search);
                    if (params?.sortBy)
                        searchParams.append("sortBy", params.sortBy);
                    if (params?.order)
                        searchParams.append("order", params.order);

                    return `?${searchParams.toString()}`;
                },
                providesTags: ["Users"],
            }),
            getUserByCustomerNumber: builder.query<
                User,
                { customerNumber: string }
            >({
                query: ({ customerNumber }) => ({
                    url: `/${customerNumber}`,
                    method: "GET",
                }),
            }),
            addUser: builder.mutation<CreateUserDto, Partial<User>>({
                query: (body) => ({
                    url: "",
                    method: "POST",
                    body,
                }),
                invalidatesTags: ["Users"],
            }),
            editUser: builder.mutation<EditUserDto, Partial<User>>({
                query: (body) => ({
                    url: `/${body.customerNumber}`,
                    method: "PUT",
                    body,
                }),
                invalidatesTags: ["Users"],
            }),
            deleteUser: builder.mutation<boolean, { customerNumber: string }>({
                query: ({ customerNumber }) => ({
                    url: `/${customerNumber}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["Users"],
            }),
        };
    },
});

export const {
    useGetUsersQuery,
    useGetUserByCustomerNumberQuery,
    useAddUserMutation,
    useEditUserMutation,
    useDeleteUserMutation,
} = userSlice;
