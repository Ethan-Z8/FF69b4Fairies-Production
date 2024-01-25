import "../styling/loginText.css";

export function LoginText() {
  return (
    <div className="mergePaddingResolve">
      <div className={"loginTitleText"}>
        <h1>For Admin and Staff Only</h1>
        <h2>Not a Staff or Admin?</h2>
      </div>
      <div className={"BacktoMap"}>
        <a href={"/"}>Back to Map</a>
      </div>
      <div className={"loginFor"}>
        <h2>Login for </h2>
        <h3>Brigham and Women's Hospital</h3>
      </div>
    </div>
  );
}
