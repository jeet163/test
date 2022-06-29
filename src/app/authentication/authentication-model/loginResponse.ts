export interface LoginResponse {
  id: string;
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jwttoken: string;
  validUpTo: Date;
}
