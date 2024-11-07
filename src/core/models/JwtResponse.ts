import { User } from './User';

export interface JwtResponse {
    jwt: string;
    user: User;
}
