// авторизация
export interface ApiRegistrationResponse {
    status: string;
}

export interface RegistrationResponse {
    success: boolean;
    result?: ApiRegistrationResponse;
    error?: {
        message: string;
        status: number;
        errors?: any;
    };
}