import { UserPayload } from "api/apiModels";

const validateEmail = (email: string) => {
    return new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email);
}
const validateName = (name: string) => {
    return true;
    // return new RegExp('^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$').test(name);
}
const validateLastName = (lastName: string) => {
    return true;
    // return new RegExp('^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$').test(lastName);
}
const validateDate = (date: string) => {
    return true;
    // return new RegExp('^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$').test(lastName);
}

export const validateUser = (userInp: UserPayload) => {
    if (!validateName(userInp.name)) {
        return ['First name format wrong']
    }
    if (!validateLastName(userInp.lastName)) {
        return ['Last name format wrong']
    }
    if (!validateEmail(userInp.email)) {
        return ['Email format wrong']
    }
    if (userInp.mobileNumber && userInp.mobileNumber.toString().length !== 8) {
        return ['Mobile number format wrong']
    }
    if (!validateDate(userInp.date)) {
        return ['Date format wrong']
    }
    if (userInp.password != userInp.password_validation) {
        return ['Passwords don\'t match']
    }
    return []
}