export type AuthModel = {
  username: string;
  password: string;
};
export type AuthResponse = {
  id: number;
  username: string;
  role: string;
  accessToken: string;
};
export type AuthRequest = Omit<AuthModel, "id">;
export type RegisterRequest = AuthModel & {
  name: string;
};
export type UserInfoModel = {
  id: number;
  name: string;
  username: string;
  role: string; // You could also create an enum for roles if you have predefined roles
  password: string; // Typically you'd store hashed passwords as strings
  phone: string | null; // Phone can be null
  address: string;
  position: string | null; // Position can be null
  createdTime: string | null; // Created time can be null, or you could use `Date` if it's a date object
  calendars: any[]; // Assuming the calendar is an array of some objects, you can specify the type based on its structure
};
