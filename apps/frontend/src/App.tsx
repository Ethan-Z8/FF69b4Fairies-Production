import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import HomePage from "./routes/HomePage.tsx";
import LoginPage from "./routes/LoginPage.tsx";
import AdminPage from "./routes/AdminPage.tsx";
import FileReader from "./routes/file_reader.tsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <div />,
      element: <Root />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/loginpage",
          element: <LoginPage />,
        },
        {
          path: "/adminPage",
          element: <AdminPage />,
        },
        {
          path: "/file_reader",
          element: <FileReader />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
  function Root() {
    return (
      <div className="pageAlignment">
        <Outlet />
      </div>
    );
  }
}

export default App;
