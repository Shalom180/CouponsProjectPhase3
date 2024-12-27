// The structure of a JWT token
export interface JwtUser {
    issuer: string;
    issuedAt: Date;
    clientType: string;
    id: number;
    username: string;
    email: string;
    expiresAt: Date;
}