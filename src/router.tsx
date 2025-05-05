import { createBrowserRouter } from "react-router-dom";
import { AuthLayout, Login, Signup } from "@/components/Authorization";
import { Home } from "@/components/Home";
import { NotFoundPage } from "@/components/NotFoundPage";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
