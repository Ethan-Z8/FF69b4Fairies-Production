import "../styling/login.css";
function LoginFully() {
  return (
    <button className="buttonForLogin" type="submit">
      Login
    </button>
  );
}

function ForgotPassword() {
  return (
    <h4 className="suggestionHeader">
      Forgot password, request help at front desk
    </h4>
  );
}

export default function LoginButton() {
  return (
    <>
      <ForgotPassword />
      <LoginFully />
    </>
  );
}
