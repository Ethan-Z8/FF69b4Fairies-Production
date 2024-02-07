import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigation } from "./components/Navigation.tsx";
import { CreateServiceRequestPage } from "./routes/CreateServiceRequestPage.tsx";
import { ViewServiceRequestPage } from "./routes/ViewServiceRequestPage.tsx";
import { ImportAndExportDataPage } from "./routes/ImportAndExportDataPage.tsx";
import { MapDataPage } from "./routes/MapDataPage.tsx";
import { LoginPage } from "./routes/LoginPage.tsx";
import AddEmployeePage from "./routes/AddEmployeePage.tsx";
import { DisplayPath } from "./components/DisplayPath.tsx";
import TransformContainer from "./components/TransformContainer.tsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <div />,
      element: <Root />,
      children: [
        {
          path: "/",
          element: (
            <TransformContainer>
              <DisplayPath />
            </TransformContainer>
          ),
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/createServiceRequest",
          element: <CreateServiceRequestPage />,
        },
        {
          path: "/viewServiceRequest",
          element: <ViewServiceRequestPage />,
        },
        {
          path: "/importAndExportData",
          element: <ImportAndExportDataPage />,
        },
        {
          path: "/mapData",
          element: <MapDataPage />,
        },
        {
          path: "/addEmployee",
          element: <AddEmployeePage />,
        },
      ],
    },
  ]);

  return (
    <>
      <Navigation />
      <RouterProvider router={router} />
    </>
  );

  function Root() {
    return (
      <div className="pageAlignment">
        <Outlet />
      </div>
    );
  }
}

export default App;
