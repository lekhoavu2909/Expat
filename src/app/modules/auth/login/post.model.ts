export interface Login {
    username: string
    password: string;
}

export interface Signup {
    username: string;
    email: string;
    password: string;
}

export interface changePassword {
    username: string
    currentPassword: string
    newPassword: string
    confirmNewPassword: string
}