const baseUrl = 'https://expense-manager-react-e031e-default-rtdb.firebaseio.com';

const apiKey = 'AIzaSyDR4j6XUm5FLqdeXDzID-G14UzQ_PZjTZo';

const signupUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;

const loginpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

const errors = {
    'EMAIL_NOT_FOUND': "This user is not registered! Please Signup.",
    'TOO_MANY_ATTEMPTS_TRY_LATER': "Access to this account has been temporarily disabled due to many failed login attempts.",
    'INVALID_PASSWORD': "You have entered invalid password!",
    'ERR_CONNECTION': "Network error! Please check your internet connection and try again.",
    'EMAIL_EXISTS': "Looks like you already have an account with us! Try logging in instead."
}

const appStrings = {
    login: 'Login',
    signup: 'Signup',
    usernameWarningText: 'Please enter the correct username.',
    passwordWarningText: 'Please enter the correct password.',
    existingUserText: 'Already have an account?',
    signupUserText: 'New user? click here to signup!',
    appName: 'Expense Manager'
}


export { errors, appStrings, baseUrl, signupUrl, loginpUrl, apiKey };