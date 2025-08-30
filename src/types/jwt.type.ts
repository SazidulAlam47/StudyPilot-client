import { type JwtPayload } from 'jwt-decode';

export type TDecodedUser = JwtPayload & {
    name: string;
    email: string;
    hasPassword?: boolean;
};
