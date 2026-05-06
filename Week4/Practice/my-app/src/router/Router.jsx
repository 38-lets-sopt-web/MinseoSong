// Router.jsx

import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import UserDetail from "../pages/UserDetail";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/user/:id",
    Component: UserDetail,
  },
]);

export default router;
