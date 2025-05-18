export interface JwtPayload {
    exp: any;
    id: number;
    email: string;
    roles: string[];
}
