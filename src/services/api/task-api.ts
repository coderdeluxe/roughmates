import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TTask } from "../../models/task";

export const TaskAPI = createApi({
  reducerPath: "taskAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["Task"],
  endpoints: (build) => ({
    getTasks: build.query<TTask[], void>({
      query: () => "Tasks",
      providesTags: [{ type: "Task", id: "LIST" }],
    }),
    getTask: build.query<TTask, string>({
      query: (id) => `tasks/${id}`,
      providesTags: (result, error, id) => [{ type: "Task", id }],
    }),
    createTask: build.mutation<TTask, Partial<TTask>>({
      query: (body) => ({
        url: "Tasks",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Task", id: "LIST" }],
    }),
    updateTask: build.mutation<void, Partial<TTask>>({
      query: ({ id, ...rest }) => ({
        url: `Tasks/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: [{ type: "Task", id: "LIST" }],
    }),
    deleteTask: build.mutation<{ success: Boolean; id: string }, string>({
      query: (id) => ({
        url: `Tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Task", id: "LIST" }],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = TaskAPI;
