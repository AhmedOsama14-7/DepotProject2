import * as Yup from "yup"
export const LoginValidation = Yup.object({
    Email: Yup.string().email().required("Email is required"),
    Password: Yup.string().min(8).required("Password is required"),
});

const passwordRules = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$&])[A-Za-z\d@$&]{8,}$/;
export const registerValidation = Yup.object({
    Email: Yup.string().email("Please enter a valid email address (e.g., example@domain.com).").required("Email is required."),
    Name: Yup.string().min(3 , "Name must be at least 3 letters").required("Name is required . "),
    FistName: Yup.string().min(3 , "Name must be at least 3 letters").required("Name is required . "),
    SecondName: Yup.string().min(3 , "Name must be at least 3 letters").required("Name is required . "),
    Password: Yup.string()
        .matches(passwordRules, "Password must contain at least one uppercase letter, one digit, and one special character (@, $, &), and be at least 8 characters long.")
        .required("Password is required"),

    ConfirmPassword: Yup.string()
        .oneOf([Yup.ref("Password"), null], "Passwords do not match. Please check and try again.")
        .required("Confirm password is required."),
});

export const profileValidations = Yup.object({
    Email: Yup.string().email("Please enter a valid email address (e.g., example@domain.com)."),
    Name: Yup.string().min(3 , "Name must be at least 3 letters"),
    FistName: Yup.string().min(3 , "Name must be at least 3 letters"),
    SecondName: Yup.string().min(3 , "Name must be at least 3 letters"),

}) 

export const addressesValidation = Yup.object({
    firstName:Yup.string().min(3 ,  "Name must be at least 3 letters").required("First Name is required"),
    secondName:Yup.string().min(3 ,  "Name must be at least 3 letters").required("Second Name is required"),
    CompanyName:Yup.string().min(3 ,  "Name must be at least 3 letters"),
    secondName:Yup.string().min(3 ,  "Name must be at least 3 letters").required("Second Name is required"),
    // country:Yup.string().required("Country is Required"),
    // region:Yup.string().required("State is Required"),
    town:Yup.string().required("Town  is required"),
    streetAddress: Yup.string().required("Street Address  is required"),
    apartmentAddress:Yup.string().required("Apartment Address  is required"),

})