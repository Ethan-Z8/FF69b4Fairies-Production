import React from "react";
import { useNavigate } from "react-router-dom";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigation } from "./components/Navigation.tsx";
import { CreateServiceRequestPage } from "./routes/CreateServiceRequestPage.tsx";
import { ViewServiceRequestPage } from "./routes/ViewServiceRequestPage.tsx";
import { ImportAndExportDataPage } from "./routes/ImportAndExportDataPage.tsx";
import { MapDataPage } from "./routes/MapDataPage.tsx";
import { LoginPage } from "./routes/LoginPage.tsx";
import { DisplayPath } from "./components/DisplayPath.tsx";
import TransformContainer from "./components/TransformContainer.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
import AddEmployeePage from "./routes/AddEmployeePage.tsx";
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
      <RouterProvider router={router} />
    </>
  );

  function Root() {
    const navigate = useNavigate();

    return (
      <Auth0Provider
        useRefreshTokens
        cacheLocation="localstorage"
        domain="dev-y3oolmq2fczbeey6.us.auth0.com"
        clientId="ZQu8ft9CKD63fMV9DJPvSU4jZSA4s5Ur"
        onRedirectCallback={(appState) => {
          navigate(appState?.returnTo || window.location.pathname);
        }}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: "/api",
          scope: "openid profile email offline_access",
        }}
      >
        <Navigation />
        <div className="pageAlignment">
          <Outlet />
        </div>
      </Auth0Provider>
    );
  }
}

export default App;
