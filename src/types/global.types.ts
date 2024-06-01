
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
    createdat: string
}


export interface updatepasswordtype {
    oldPassword: string,
    newPassword: string
}

export interface formdata {
    email: string;
    password: string;
}

