import { createBrowserRouter } from "react-router-dom";
import { HeroPage, Dashboard } from "@/pages";
import { CreateContestPage } from "@/pages/CreateContestPage/CreateContestPage";
import { LoginPage } from "@/pages/LoginPage";
import { PageNotFound } from "@/pages/error";
import { ContestsList } from "@/features/contests/components/ContestsList";
import { Layout } from "@/lib/layout/Layout";
import { SpotifyAuthCallback } from "@/pages/SpotifyAuthCallback";
import { OneOfXForm } from "@/features/contests/components/OneOfXForm";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HeroPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/create-contest",
        element: (
          // <ProtectedRoute>
          <CreateContestPage />
          // </ProtectedRoute>
        ),
        children: [
          {
            path: "/create-contest/one-of-x",
            element: <OneOfXForm />,
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
