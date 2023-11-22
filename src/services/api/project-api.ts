import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TProject } from "../../models/project";


export const ProjectAPI = createApi({
  reducerPath: "projectAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["Project"],
  endpoints: (build) => ({
    getProjects: build.query<TProject[], void>({
      query: () => "Projects",
      providesTags: [{ type: "Project", id: "LIST" }],
    }),
    getProject: build.query<TProject, string>({
      query: (id) => `projects/${id}`,
      providesTags: (result, error, id) => [{ type: "Project", id }],
    }),
    createProject: build.mutation<TProject, Partial<TProject>>({
      query: (body) => ({
        url: "/Projects",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Project", id: "LIST" }],
    }),
    updateProject: build.mutation<void, Partial<TProject>>({
      query: ({ id, ...rest }) => ({
        url: `Projects/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: [{ type: "Project", id: "LIST" }],
    }),
    deleteProject: build.mutation<{ success: Boolean; id: string }, string>({
      query: (id) => ({
        url: `Projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Project", id: "LIST" }],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = ProjectAPI;
