import React, { useEffect, useState } from "react";
import "../styling/homePage.css";
import { Desktop } from "../components/Desktop.tsx";
import AdminServices from "../components/AdminServices.tsx";

function AdminPage() {
  const [selectedTab, setSelectedTab] = useState(1);

  useEffect(() => {
    document.title = "admin page";
    console.log(`rendered component`);
  }, []);

  const handleTabClick = (tabIndex: number) => {
    setSelectedTab(tabIndex);
  };

  return (
    <div className="w-100 h-100 d-flex flex-column overflow-auto">
      <Desktop
        whatServiceOptions={<AdminServices />}
        navBarArray={[
          "ADMIN MENU",
          "UPLOAD DATA",
          "MAP DATA",
          "SERVICE DATA",
          "SERVICES",
          "TRANSPORT",
        ]}
        pageStatus={"LOGOUT"}
        selectedTab={selectedTab}
        onTabClick={handleTabClick}
      />
    </div>
  );
}

export default AdminPage;
