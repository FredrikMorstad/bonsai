
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

interface newUser{
    name: string,
    lastName: string,
    email: string,
    mobileNumber?: number,
    date: string,
}

export const validateUser = (regInp: newUser) => {
    if (!validateName(regInp.name)) {
        return ['First name format wrong']
    }
    if (!validateLastName(regInp.lastName)) {
        return ['Last name format wrong']
    }
    if (!validateEmail(regInp.email)) {
        return ['Email format wrong']
    }
    if (regInp.mobileNumber && regInp.mobileNumber.toString().length !== 8) {
        return ['Mobile number format wrong']
    }
    if (!validateDate(regInp.date)) {
        return ['Date format wrong']
    }
    return []
}