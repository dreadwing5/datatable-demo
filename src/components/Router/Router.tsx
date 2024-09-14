import { createBrowserRouter, RouteObject } from "react-router-dom";
import DataTable from "../Datatable/DataTable";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <DataTable />,
    children: [],
  },
];

export const router = createBrowserRouter(routes);
