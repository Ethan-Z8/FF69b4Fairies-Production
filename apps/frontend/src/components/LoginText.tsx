import "../styling/loginText.css";

export function LoginText() {
  return (
    <div>
      <div className={"loginTitleText"}>
        <h1>For Admin and Staff Only</h1>
        <h1>Not a Staff or Admin?</h1>
      </div>
      <div className={"loginFor"}>
        <h2>Login for </h2>
        <h3>Brigham and Women's Hospital</h3>
      </div>
      <div className={"idNumberEntryText"}>
        <h1>ID Number</h1> <h2>Swipe card for instant access</h2>
      </div>
    </div>
  );
}
