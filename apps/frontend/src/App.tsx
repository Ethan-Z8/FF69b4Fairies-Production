import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Navigation } from "./components/Navigation.tsx";
import { CreateServiceRequestPage } from "./routes/CreateServiceRequestPage.tsx";
import AddEmployeePage from "./routes/AddEmployeePage.tsx";
import HomePage from "./routes/HomePage.tsx";
import { ImportAndExportDataPage } from "./routes/ImportAndExportDataPage.tsx";
import { LoginPage } from "./routes/LoginPage.tsx";
import { MapDataPage } from "./routes/MapDataPage.tsx";
import { ViewServiceRequestPage } from "./routes/ViewServiceRequestPage.tsx";
//import Button from "react-bootstrap/Button";

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
