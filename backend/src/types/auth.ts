export type UserRole = 'recruiter' | 'seeker';

export interface JwtUser {
  id: number;
  role: UserRole;
}

export interface UserRecord extends JwtUser {
  name: string;
  email: string;
  password?: string;
}
