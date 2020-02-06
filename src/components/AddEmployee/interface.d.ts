export interface AddEmployeeInterface {
  closeModal: () => void;
  onChange: (event: any) => void;
  onSubmit: () => void;
  validation: {
    name: boolean;
    mon: boolean;
    tues: boolean;
    wed: boolean;
    thus: boolean;
    fri: boolean;
  };
}

export interface timeInput {
  id: string;
  day: string;
  validate: any;
}
