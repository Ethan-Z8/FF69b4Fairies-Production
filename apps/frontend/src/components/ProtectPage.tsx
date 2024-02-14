import React, { ComponentType } from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";

//
interface ProtectPageProps {
  Page: ComponentType<unknown>;
}

const ProtectPage: React.FC<ProtectPageProps> = ({ Page: page }) => {
  const PageProtected = withAuthenticationRequired(page);

  return <PageProtected />;
};

export default ProtectPage;
