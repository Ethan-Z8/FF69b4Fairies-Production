import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import HomePage from "./routes/HomePage.tsx";
import LoginPage from "./routes/LoginPage.tsx";
import AdminPage from "./routes/AdminPage.tsx";
//import ServicePage from "./routes/ServiceRequestMenu.tsx";
import RequestLogPage from "./routes/ServiceRequestLog.tsx";

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
          path: "/loginPage",
          element: <LoginPage />,
        },
        {
          path: "/adminPage",
          element: <AdminPage />,
        },
        {
          path: "/requestLogPage",
          element: <RequestLogPage />,
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
