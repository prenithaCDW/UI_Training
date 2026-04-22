//choices
function Banking() {

    //anonymous function
    const Bank = (function () {
        const accounts = [
            { accountNumber: "1001", balance: 25000, cards: [{ cardNumber: "1111-2222", pin: "1234" }, { cardNumber: "3333-4444", pin: "2345" }] },
            { accountNumber: "1003", balance: 8000, cards: [{ cardNumber: "5555-6666", pin: "3456" }] },
            { accountNumber: "1004", balance: 20000, cards: [{ cardNumber: "7777-8888", pin: "4567" }] },
            { accountNumber: "1005", balance: 5000, cards: [{ cardNumber: "9999-0000", pin: "5678" }] }
        ];
        //verify account
        function verifyAccount(accountNumber) {
            return accounts.find(account => account.accountNumber === accountNumber);
        }

        //ATM object function
        const ATM = {
            //withdraw
            withdraw: function (account, amount) {
                console.log("entered")
                if (isNaN(amount) || amount <= 0) {
                    return "Invalid amount";
                }
                if (amount > account.balance) {
                    return "Insufficient balance";
                }
                account.balance -= amount;
                return `Withdrawal was successful. The balance amount is ${account.balance}`;
            },
            //deposit
            deposit: function (account, amount) {
                if (isNaN(amount) || amount <= 0) {
                    return "Invalid amount";
                }
                account.balance += amount;
                return `Deposit was successful. The balance amount is ${account.balance}`;
            },
            //balance
            balance: function (account) {
                return `The balance in account is ${account.balance}`;
            },
            verifyAccount,
        }
        return { ATM };
        // Immediately Invoked Function Expression
    })();
    while (true) {
        const accountNumber = window.prompt("Enter account number: ");

        const account = Bank.ATM.verifyAccount(accountNumber);
        if (!account) {
            window.alert("Invalid account number");
            continue;
        }

        const cardNumber = window.prompt("Enter card number: ");
        const pin = window.prompt("Enter PIN: ");

        if (account.cards.filter((card) => card.cardNumber === cardNumber && card.pin === pin).length === 0) {
            window.alert("Invalid card or pin details");
            continue;
        }

        const choice = window.prompt("ATM Menu\n1. Withdraw\n2. Deposit\n3.Balance \n4. Exit\nEnter your choice:");
        switch (choice) {
            case "1": {
                const amount = Number(window.prompt("Enter amount: "));
                window.alert(Bank.ATM.withdraw(account, amount));
                break;
            }
            case "2": {
                const amount = Number(window.prompt("Enter amount: "));
                window.alert(Bank.ATM.deposit(account, amount));
                break;
            }
            case "3": {
                window.alert(Bank.ATM.balance(account));
                break;
            }
            case "4": {
                window.alert("Exit program");
                return;
            }
            default: {
                window.alert("Invalid Option");
                return;
            }
        }
    }
}

Banking();
