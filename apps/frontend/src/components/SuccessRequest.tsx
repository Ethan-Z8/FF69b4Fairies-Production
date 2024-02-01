import Alert from "react-bootstrap/Alert";
export default function SuccessRequest() {
  return (
    <>
      {["success"].map((variant) => (
        <Alert key={variant} variant={variant}>
          This is a {variant} alert—check it out!
        </Alert>
      ))}
    </>
  );
}
