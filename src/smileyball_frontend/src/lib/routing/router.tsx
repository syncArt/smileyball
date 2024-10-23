import { createBrowserRouter } from "react-router-dom";
import { HeroPage, SongRequestPage } from "@/pages";
import { CreateContestPage } from "@/pages/CreateContestPage/CreateContestPage";
import { LoginPage } from "@/pages/LoginPage";
import { PageNotFound } from "@/pages/error";
import { CreateContestForm } from "@/features/contests/components/CreateContestForm";
import { ContestsList } from "@/features/contests/components/ContestsList";
import { Layout } from "@/lib/layout/Layout";
import { ProtectedRoute } from "@/lib/layout/ProtectedRoute";
import { SpotifyAuthCallback } from "@/pages/SpotifyAuthCallback";

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
