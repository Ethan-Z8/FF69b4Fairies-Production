import React, { useEffect } from "react";

function AdminPage() {
  useEffect(() => {
    document.title = "admin page";
    console.log(`rendered component`);
  });
  return (
    <div className="w-100 h-100 d-flex flex-column overflow-auto">
      <h1>This is the Admin page.</h1>
    </div>
  );
}
export default AdminPage;
