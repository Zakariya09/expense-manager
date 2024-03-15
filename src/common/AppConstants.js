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

const salaryGridColumn = [
    { id: "date", label: "Date", minWidth: 100 },
    { id: "amount", label: "Amount", minWidth: 100 },
    { id: "Actions", label: "Actions", minWidth: 10 },
];

const journalGridColumns = [
    { id: "date", label: "Date", minWidth: 100 },
    { id: "stockName", label: "Stock Name", minWidth: 100 },
    { id: "entryPrice", label: "Entry Price", minWidth: 10 },
    { id: "exitPrice", label: "Exit Price", minWidth: 10 },
    { id: "quantity", label: "Quantity", minWidth: 10 },
    { id: "profitLoss", label: "Profit/Loss", minWidth: 10 },
    { id: "breakdown", label: "Breakdown", minWidth: 10 },
    { id: "Actions", label: "Actions", minWidth: 10 },
];

const equityGridColumns = [
    { id: "stockName", label: "Stock Name", minWidth: 100 },
    { id: "entryPrice", label: "Entry Price", minWidth: 10 },
    { id: "target", label: "Target", minWidth: 10 },
    { id: "debtPercent", label: "Debt in %", minWidth: 10 },
    { id: "allTimeHigh", label: "All Time High", minWidth: 10 },
    { id: "allTimeLow", label: "All Time Low", minWidth: 10 },
    { id: "Actions", label: "Actions", minWidth: 10 },
];

const incomeTypes = [
    { id: 1, name: 'Salary' },
    { id: 2, name: 'Trading' },
    { id: 3, name: 'Other' },
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
    deleteExpense: 'Delete Expense',
    updateExpense: 'Update Expense',
    update: 'Update',
    deleteSalary: 'Delete Salary',
    addSalary: 'Add Salary',
    add: 'add',
    saveIcon: 'save',
    closeIcon: 'close',
    addJournal: 'Add Journal',
    deleteJournal: 'Delete Journal',
    updateJournal: 'Update Journal',
    addEquity: 'Add Equity',
    updateEquity: 'Update Equity',
    deleteEquity: 'Delete Equity',
    incomeType: 'Type',
    addIncome: 'Add Income',
    incomePlaceHolder: 'Select income type',
    updateIncome:'Update Income',
    deleteIncome:'Delete Income'
}


export { incomeTypes, errors, appStrings, baseUrl, signupUrl, loginpUrl, apiKey, expenseGridColumn, salaryGridColumn, journalGridColumns, equityGridColumns };