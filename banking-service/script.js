//anonymous function
const Bank = (function () {
    const accounts = [
        { accountNumber: "1001", cardNumber: "1111-2222", pin: "1234", balance: 10000 },
        { accountNumber: "1002", cardNumber: "3333-4444", pin: "2345", balance: 15000 },
        { accountNumber: "1003", cardNumber: "5555-6666", pin: "3456", balance: 8000 },
        { accountNumber: "1004", cardNumber: "7777-8888", pin: "4567", balance: 20000 },
        { accountNumber: "1005", cardNumber: "9999-0000", pin: "5678", balance: 5000 }
    ];
    //verify account
    function verifyAccount(accountNumber){
        return accounts.find(account=> account.accountNumber===accountNumber);
    }
    //verify card and pin
    function getAccountDetails(cardNumber, pin) {
        return accounts.find(account =>account.cardNumber === cardNumber && account.pin === pin);
    }
    //ATM object function
    const ATM = {
        //withdraw
        withdraw: function ( account, amount) {

            if (isNaN(amount)||amount < 0) {
                return "Invalid amount";
            }
            if (amount > account.balance) {
                return "Insufficient balance";
            }
            account.balance -= amount;
            return `Withdrawal was successful. The balance amount is ${account.balance}`;
        },
        //deposit
        deposit: function ( account, amount) {
            if (isNaN(amount)||amount < 0) {
                return "Invalid amount";
            }
            account.balance += amount;
            return `Deposit was successful. The balance amount is ${account.balance}`;
        },
        balance: function(account){
            return `The balance in account is ${account.balance}`;
        },
        verifyAccount,
        getAccountDetails,
    }
    return { ATM };
    // Immediately Invoked Function Expression
})();

//choices
function Banking() {
    while (true) {
        const accountNumber = window.prompt("Enter account number: ");

        const account=Bank.ATM.verifyAccount(accountNumber);
        if(!account){
            window.alert("Invalid account number");
            continue;
        }

        const cardNumber = window.prompt("Enter card number: ");
        const pin = window.prompt("Enter PIN: ");

        const accountDetails=Bank.ATM.getAccountDetails(cardNumber,pin);
        if(!accountDetails||accountDetails.accountNumber!=account.accountNumber){
            window.alert("Invalid card or pin details");
            continue;
        }
        const choice = window.prompt("ATM Menu\n1. Withdraw\n2. Deposit\n3.Balance \n4. Exit\nEnter your choice:");

        if (choice === "4") {
            window.alert("Exit program");
            return;
        }

        if (choice === "1") {
            const amount = Number(window.prompt("Enter amount: "));
            window.alert(Bank.ATM.withdraw(accountDetails, amount));
        }
        else if (choice === "2") {
            const amount = Number(window.prompt("Enter amount: "));
            window.alert(Bank.ATM.deposit(accountDetails, amount));
        }

        else if(choice==="3"){
            window.alert(Bank.ATM.balance(accountDetails));
        }

        else {
            window.alert("Invalid Option");
            return;
        }
    }
}

Banking();
