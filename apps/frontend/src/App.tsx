import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigation } from "./components/Navigation.tsx";
import { CreateServiceRequestPage } from "./routes/CreateServiceRequestPage.tsx";
import { ViewServiceRequestPage } from "./routes/ViewServiceRequestPage.tsx";
import { ImportAndExportDataPage } from "./routes/ImportAndExportDataPage.tsx";
import { MapDataPage } from "./routes/MapDataPage.tsx";
import { LoginPage } from "./routes/LoginPage.tsx";
import AddEmployeePage from "./routes/AddEmployeePage.tsx";
import HomePage from "./routes/HomePage.tsx";
import ReligionForm from "./components/ReligionForm.tsx";
import { EmployeeData } from "./routes/EmployeeData.tsx";

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
          path: "/viewEmployeeData",
          element: <EmployeeData />,
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
        {
          path: "/createReligion",
          element: <ReligionForm />,
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
