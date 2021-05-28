import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-toast'
const showToast = (msg) => {
    if (typeof msg === 'string') {
        Toast.show(msg)
    } else {
        Toast.show('An error occured while processing')
    }
}
const persistConfig = {
    key: "biryaniKing-storage-root",
    storage: AsyncStorage,
}

const regex = {
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    alphabets: /^[a-zA-Z ]*$/,
    phone: /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm,
    numbers:/^[0-9]+$/
}
const msg = {
    requiredEmail: 'Please enter your email address',
    invalidEmail: 'Please enter a valid email address',
    requiredPassword: 'Please enter your password',
    shortPassword: 'Password should be at least 8 characters long',
    loginSuccess: 'User loggedin successfully',
    registerSuccess: 'User Registered successfully, Please verify your email to continue',
    requiredPhone: 'Please enter your phone number',
    confirmPassword: 'Please confirm your password',
    passwordNotMatch: 'Passwords do not match',
    invalidPhone: 'Please enter a valid phone number, a valid phone number should start with a country code',
    requiredFirstname: 'Please enter your first name',
    requiredLastname: 'Please enter your last name',
    invalidLastname: 'Please enter a valid last name',
    invalidFirstname: 'Please enter a valid first name',
    requiredActivation:'Please enter your activation code',
    invalidActivation:'Please enter a valid activation code',
    shortActivation:'Activation code must be of at least 8 digits',
    emailSent:"Email sent successfully",
    profileUpdatedSuccess:"Profile updated successfully"

}
const events = {
    verifyAccountEvent: 'biryaniKing:verifyAccount',
    logoutAccountEvent: 'biryaniKing:logoutAccount'
}
const Utils = {
    regex: regex,
    showToast: showToast,
    persistConfig: persistConfig,
    msg: msg,
    events: events
}
export default Utils;