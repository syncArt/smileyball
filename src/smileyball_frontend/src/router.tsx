import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@/modules";
import { HeroPage, SongRequestPage } from "@/pages";

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
    ],
  },
]);
