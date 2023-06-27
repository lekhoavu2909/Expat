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

export interface User {
    id: number,
    username: string,
    photoUrl: string,
    age: number,
    knownAs: string,
    created: string,
    lastActive: string,
    gender: string,
    introduction: string,
    lookingFor: string,
    interests: string,
    city: string,
    country: string,
    photos: Photo[]
}


export interface Photo{
    id: number,
    url: string,
    isMain: boolean
  }