import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@/modules";
import { HeroPage, SongRequestPage } from "@/pages";
import { CreateContestPage } from "@/pages/CreateContestPage";
import { LoginPage } from "@/pages/LoginPage";
import { PageNotFound } from "@/pages/error";
import ProtectedRoute from "@/modules/ProtectedRoute";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HeroPage />,
      },
      {
        path: "/song-request",
        element: <SongRequestPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/create-contest",
        element: (
          <ProtectedRoute>
            <CreateContestPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);
