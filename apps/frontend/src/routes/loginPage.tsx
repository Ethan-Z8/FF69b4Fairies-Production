import React from "react";
import { ExampleComponent } from "../components/ExampleComponent.tsx";
function loginPage() {
  return (
    <div className="w-100 h-100 d-flex flex-column overflow-auto">
      <h1>This is the login page.</h1>
      <ExampleComponent></ExampleComponent>
    </div>
  );
}
export default loginPage;
