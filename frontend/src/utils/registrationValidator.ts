import { UserPayload } from 'api/apiModels';

const validateEmail = (email: string) => {
  return new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(
    email
  );
};
const validateName = (name: string) => {
  return true;
  // return new RegExp('^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$').test(name);
};
const validateLastName = (lastName: string) => {
  return true;
  // return new RegExp('^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$').test(lastName);
};
const validateDate = (date: string) => {
  return true;
  // return new RegExp('^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$').test(lastName);
};

export const validateUser = (userInp: UserPayload) => {
  if (!validateName(userInp.first_name)) {
    return ['First name format wrong'];
  }
  if (!validateLastName(userInp.last_Name)) {
    return ['Last name format wrong'];
  }
  if (!validateEmail(userInp.email)) {
    return ['Email format wrong'];
  }
  if (userInp.mobile_number && userInp.mobile_number.toString().length !== 8) {
    return ['Mobile number format wrong'];
  }
  if (!validateDate(userInp.date_of_birth)) {
    return ['Date format wrong'];
  }
  if (userInp.password !== userInp.password_validation) {
    return ["Passwords don't match"];
  }
  return [];
};
