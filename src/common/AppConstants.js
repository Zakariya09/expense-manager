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

const expenseGridColumn = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "amount", label: "Amount", minWidth: 100 },
    { id: "date", label: "Date", minWidth: 100 },
    { id: "Actions", label: "Actions", minWidth: 10 },
];

const appStrings = {
    login: 'Login',
    signup: 'Signup',
    usernameWarningText: 'Please enter the correct username.',
    passwordWarningText: 'Please enter the correct password.',
    existingUserText: 'Already have an account?',
    signupUserText: 'New user? click here to signup!',
    appName: 'Expense Manager',
    expenseSummary: 'Expense Summary',
    totalExpense: 'Total Expense',
    expenseThisMonth: 'Expense This Month',
    totalSavings: 'Total Savings',
    totalInvested: 'Total Invested',
    addExpense: 'Add Expense',
    name: 'Name',
    enterNameWarningText: 'Please enter name.',
    amount: 'Amount',
    amountWarningTest: 'Please enter amount.',
    date: 'Date',
    dateWarningText: ' Please Select date.',
    save: 'Save',
    cancel: 'Cancel',
    deleteConfirmText: 'Are you sure wants to delete the record?',
    deleteWarningText: 'Once deleted, you will not be able to recover this record!',
    delete: 'Delete',
    deleteExpense:'Delete Expense',
    updateExpense:'Update Expense',
    update:'Update'
}


export { errors, appStrings, baseUrl, signupUrl, loginpUrl, apiKey, expenseGridColumn };