export interface Token {
    refresh_token: string;
    access_token: string;
    token_type: string;
}

export class TokenRefreshPayload {
    refresh_token: string;

    constructor(refresh_token: string) {
        this.refresh_token = refresh_token;
    }
}

export class LoginPayload {
    username: string;
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}
