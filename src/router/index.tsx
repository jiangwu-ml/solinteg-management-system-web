import { createBrowserRouter } from "react-router-dom";
import { RedirectIfAuthed, RequireAuth } from "@/components/authGuard";
import { HelloPage } from "@/pages/hello/helloPage";
import { LoginPage } from "@/pages/login/loginPage";

export const router = createBrowserRouter([
  {
    element: <RedirectIfAuthed />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    element: <RequireAuth />,
    children: [
      {
        path: "/",
        element: <HelloPage />,
      },
    ],
  },
]);
