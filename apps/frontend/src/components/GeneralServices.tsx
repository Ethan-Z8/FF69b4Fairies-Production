import RequestService from "./RequestService.tsx";

export default function GeneralServices() {
  return (
    <>
      <RequestService
        typeOfService1={"Request Medicine"}
        typeOfService2={"Request Nurse"}
        typeOfService3={"Request Doctor"}
        typeOfService4={"URGENT!"}
      />
    </>
  );
}
