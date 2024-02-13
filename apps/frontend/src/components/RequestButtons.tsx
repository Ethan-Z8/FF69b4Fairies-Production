import React from "react";
import "../styling/RequestButtons.css";
import { RequestButtonInterface } from "../interfaces/RequestButtonInterface";

function RequestButtons({
  submit: submit,
  clear: clear,
}: RequestButtonInterface) {
  function handleSubmit() {
    submit();
    //console.log("submit");
  }

  function handleClear() {
    clear();
    //console.log("clear");
  }
  return (
    <div className={"requestButtonsDiv"}>
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={handleClear}>Clear</button>
      {/*<a href={"/"}>*/}
      {/*    <button>back</button>*/}
      {/*</a>*/}
    </div>
  );
}

export default RequestButtons;
