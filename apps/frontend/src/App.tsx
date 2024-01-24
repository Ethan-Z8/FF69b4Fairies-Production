import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { HomePage } from "./routes/homePage.tsx";
import LoginPage from "./routes/loginPage.tsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <div />,
      element: <Root />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
        {
          path: "/loginpage",
          element: <LoginPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
  function Root() {
    return (
      <div className="w-100 h-100 d-flex flex-column overflow-auto">
        <Outlet />
      </div>
    );
  }
}

export default App;
