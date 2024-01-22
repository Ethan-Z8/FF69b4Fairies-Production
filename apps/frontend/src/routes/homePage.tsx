import React, { useEffect } from "react";

function HomePage() {
  useEffect(() => {
    document.title = "home page";
    console.log(`rendered component`);
  });
  return (
    <div className="w-100 h-100 d-flex flex-column overflow-auto">
      <h1>This is the home page.</h1>
    </div>
  );
}
export default HomePage;
