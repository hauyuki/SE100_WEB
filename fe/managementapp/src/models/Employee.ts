export type Employee = {
  id: number;
  username: string;
  role: string;
  position: string;
  createdTime: string | null;
  address: string;
  phone: string;
  name: string;
  department: string;
  avatar: string;
  dob: Date;
  password: string;
};
export type EmployeeRequest = {
  id?: number;
  position: string;
  address: string;
  phone: string;
  name: string;
  department: string;
  avatar: string;
  dob: string; // ISO date format
  username: string;
  password: string;
};
