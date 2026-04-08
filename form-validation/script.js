const form = document.querySelector(".checkout-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const currentYear = new Date().getFullYear();
  let isFormValid = true;

  function showError(input, message) {
    const errorDisplay = input.nextElementSibling;
    errorDisplay.textContent = message;
    input.classList.add("error");
    isFormValid = false;
  }

  function clearError(input) {
    const errorDisplay = input.nextElementSibling;
    errorDisplay.textContent = "";
    input.classList.remove("error");
  }

  // regex patterns
  const nameRegex = /^[A-Za-z]{1,30}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const mobileRegex = /^[6-9]\d{9}$/;
  const pinRegex = /^\d{6}$/;
  const visaRegex = /^(\d{4}[-\/ ]?){3}\d{4}$/;
  const cvvRegex = /^\d{3,4}$/;

  // inputs
  const firstName = form.firstName;
  const lastName = form.lastName;
  const email = form.email;
  const contact = form.contactNumber;
  const pinCode = form.pinCode;
  const cardNumber = form.cardNumber;
  const cardExpiry = form.cardExpiry;
  const cvv = form.cvv;

  // First Name
  if (!firstName.value.trim()) {
    showError(firstName, "First Name is required");
  } else if (!nameRegex.test(firstName.value.trim())) {
    showError(firstName, "First Name is not valid");
  } else {
    clearError(firstName);
  }

  // Last Name
  if (!lastName.value.trim()) {
    showError(lastName, "Last Name is required");
  } else if (!nameRegex.test(lastName.value.trim())) {
    showError(lastName, "Last Name is not valid");
  } else {
    clearError(lastName);
  }

  // Email
  if (!email.value.trim()) {
    showError(email, "Email Address is required");
  } else if (
    email.value.length >=30 ||
    !emailRegex.test(email.value.trim())
  ) {
    showError(email, "Email Address is not valid");
  } else {
    clearError(email);
  }

  // Contact Number
  if (!contact.value.trim()) {
    showError(contact, "Contact Number is required");
  } else if (!mobileRegex.test(contact.value.trim())) {
    showError(contact, "Contact Number is not valid");
  } else {
    clearError(contact);
  }

  // PIN Code
  if (!pinCode.value.trim()) {
    showError(pinCode, "PIN Code is required");
  } else if (!pinRegex.test(pinCode.value.trim())) {
    showError(pinCode, "PIN Code is not valid");
  } else {
    clearError(pinCode);
  }

  // Card Number
  if (!cardNumber.value.trim()) {
    showError(cardNumber, "Card Number is required");
  } else if (!visaRegex.test(cardNumber.value.trim())) {
    showError(cardNumber, "Card Number is not valid");
  } else {
    clearError(cardNumber);
  }

  // Card Expiry Year
  if (!cardExpiry.value.trim()) {
    showError(cardExpiry, "Card Expiry is required");
  } else if (
    !/^\d{4}$/.test(cardExpiry.value.trim()) ||
    Number(cardExpiry.value) < currentYear
  ) {
    showError(cardExpiry, "Card Expiry is not valid");
  } else {
    clearError(cardExpiry);
  }

  // CVV
  if (!cvv.value.trim()) {
    showError(cvv, "CVV is required");
  } else if (!cvvRegex.test(cvv.value.trim())) {
    showError(cvv, "CVV is not valid");
  } else {
    clearError(cvv);
  }

  // Final submit
  if (isFormValid) {
    alert("Payment completed successfully ✅");
    form.reset();
  }
});