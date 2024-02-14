export type ServiceRequestType = {
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
