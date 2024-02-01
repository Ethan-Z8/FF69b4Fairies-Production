import React, { useEffect, useState } from "react";
import "../styling/homePage.css";
import { Desktop } from "../components/Desktop.tsx";
import GeneralServices from "../components/GeneralServices.tsx";

function HomePage() {
  const [selectedTab, setSelectedTab] = useState(1);

  useEffect(() => {
    document.title = "home page";
    console.log(`rendered component`);
  }, []);

  const handleTabClick = (tabIndex: number) => {
    setSelectedTab(tabIndex);
  };

  return (
    <div className="w-100 h-100 d-flex flex-column overflow-auto">
      <Desktop
        whatServiceOptions={<GeneralServices />}
        menuProp1={"HELP"}
        menuProp2={"LANGUAGE"}
        menuProp3={"PATH"}
        menuProp4={"RELIGIOUS"}
        menuProp5={"SERVICES"}
        menuProp6={"ACCESSIBILITY"}
        pageStatus={"LOGIN"}
        selectedTab={selectedTab}
        onTabClick={handleTabClick}
      />
    </div>
  );
}

export default HomePage;
