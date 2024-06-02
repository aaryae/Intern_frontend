
export interface apiresponse {

    id: string,
    details: {
        firstName: {
            en: string
        }
        lastName: {
            en: string
        }
        middleName: {
            en: string,
        }
        phoneNumber: string,
    }
    email: string,
    role: string,
    username: string,
    createdate: string
}


export interface updatepasswordtype {
    oldPassword: string,
    newPassword: string
}

export interface formdata {
    email: string;
    password: string;
}

export interface CreateUserInterface {
    email: string
    password: string
    role: string
    allowedFeature: string[]
    details: {
        firstName: {
            en: string
            ne: string
        },
        lastName: {
            en: string
            ne: string
        },
        phoneNumber: string;
    }
}