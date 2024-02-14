export type ServiceRequestType = {
  id: string;
  date: string;
  typeService: string;
  location: string;
  employee: string;
  progress: string;
  priority: string;

  [key: string]:
    | string
    | {
        [key: string]: string | boolean;
      };
};
