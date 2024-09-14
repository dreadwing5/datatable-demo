import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./components/Router/Router";

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
