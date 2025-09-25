import { createBrowserRouter, RouteObject } from "react-router-dom";
import AppLayout from "./AppLayout";
import Home from "./pages/Home";
import TodoDetail from "./pages/TodoDetail";
import NotFound from "./pages/NotFound";
import ErrorTrigger from "./pages/ErrorTrigger";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "todo/:id", element: <TodoDetail /> },
      { path: "error", element: <ErrorTrigger /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
