import { createBrowserRouter, RouteObject } from "react-router-dom";
import DataTableContainer from "../Datatable/DataTableContainer";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <DataTableContainer />,
    children: [],
  },
];

export const router = createBrowserRouter(routes);
