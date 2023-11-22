import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../App";
import TasksListPage from "../features/tasks/tasks-list-page";
import { DashboardPage } from "../pages/dashboard/dashboard-page";
import { LoginPage } from "../pages/login/login-page";
import { RegisterPage } from "../pages/register/register-page";
import { TasksCreatePage } from "../features/tasks/tasks-create-page";
import { TasksDetailPage } from "../features/tasks/tasks-detail-page";
import { TasksEditPage } from "../features/tasks/tasks-edit-page";
import ButtonPage from "../pages/button-page";
import ProjectPageList from "../features/project/project-page-list";
import { ProjectPageDetail } from "../features/project/project-page-detail";
import { ProjectPageCreate } from "../features/project/project-page-create";
import { ProjectPageEdit } from "../features/project/project-page-edit";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "dashboard", element: <DashboardPage /> },
      {
        path: "tasks",
        element: <TasksListPage />,
      },
      { path: "tasks/detail/:id", element: <TasksDetailPage /> },
      { path: "tasks/create", element: <TasksCreatePage /> },
      { path: "tasks/edit/:id", element: <TasksEditPage /> },
      {
        path: "projects",
        element: <ProjectPageList />,
      },
      { path: "projects/detail/:id", element: <ProjectPageDetail /> },
      { path: "projects/create", element: <ProjectPageCreate /> },
      { path: "projects/edit/:id", element: <ProjectPageEdit /> },

      { path: "buttons", element: <ButtonPage /> },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
];

export const router = createBrowserRouter(routes);
