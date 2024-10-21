import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@/modules";
import { HeroPage, SongRequestPage } from "@/pages";
import { CreateContestPage } from "@/pages/CreateContestPage/CreateContestPage";
import { LoginPage } from "@/pages/LoginPage";
import { PageNotFound } from "@/pages/error";
import ProtectedRoute from "@/modules/ProtectedRoute";
import { CreateContestForm } from "@/modules/contestPage/CreateContestForm";
import { ContestsList } from "@/modules/contestPage/ContestsList";
import SpotifyAuthCallback from "@/pages/SpotifyAuthCallback";

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
        children: [
          {
            path: "/create-contest/new",
            element: <CreateContestForm />,
          },
          {
            path: "/create-contest/list",
            element: <ContestsList />,
          },
        ],
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
  {
    path: "/callback",
    element: <SpotifyAuthCallback />,
  },
]);
