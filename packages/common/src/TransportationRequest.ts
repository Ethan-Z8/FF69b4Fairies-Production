export type transportationRequest = {
  employeeName: string;
  patientName: string;
  currentLocation: string;
  destinationLocation: string;
  time2Move: string;
  time2Return: string;
  reason: string;
  priority: "Low" | "Medium" | "High" | "Emergency";
  status: "Assigned" | "InProgress" | "Completed";
};
