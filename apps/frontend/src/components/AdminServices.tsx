import RequestService from "./RequestService.tsx";

export default function AdminServices() {
  return (
    <>
      <RequestService
        typeOfService1={"Sanitation"}
        typeOfService2={"Facilities"}
        typeOfService3={"Security"}
        typeOfService4={"Transportation"}
      />
    </>
  );
}
