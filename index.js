const phone = document.getElementById("phone");
const amount = document.getElementById("amount");
const send = document.getElementById("submit");
const phoneError = document.getElementById("phnError");
const amountError = document.getElementById("amountError");
const sendSuccessText = document.getElementById("success");
const btn = document.querySelectorAll('.btn');
const PhonePe = document.querySelector('.PhonePe');
const Google_Pay = document.querySelector('.Google_Pay');
const pay_btn = document.querySelector(".pay_btn");
const no_options = document.querySelector('.no_options');

function isPhone_val(phone) {
  return /^[0-9]{10}$/.test(phone);
}

function isAmount_val(amount) {
 return  !/[a-zA-Z]/.test(amount);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!isPhone_val(phone.value)) {
    phoneError.textContent = "Please enter a valid phone number.";
    return;
  } else {
    phoneError.textContent = "";
  }

  if (!isAmount_val(amount.value)) {
    amountError.textContent = "Please enter a valid amount";
    return;
  } else {
    amountError.textContent = "";
  }

  const apiBody = {
    amount: amount.value,  
    phone: phone.value         
  };
  console.log("API Body:", apiBody);

  const response = await fetch('https:localhost:8080/send', {
    method: "POST",
      body: apiBody
  });
  console.log(response)
 
});

//which device
function isIOS() {
  return /iPhone|iPad|iPod/.test(window.navigator.userAgent);
}

function isAndroid() {
  return /Android/.test(window.navigator.userAgent);
}

function which_button_to_show() {

  if (isIOS()) {
    btn.forEach(function(button) { button.style.display = 'none'; });
    console.log("ios")
    PhonePe.style.display = 'block';
    Google_Pay.style.display = 'block';
  } 
  else if (isAndroid()) {
    console.log("android")
    btn.forEach(function(button) {
      button.style.display = 'block';
    });
  }
  else {
    console.log("desktop")
    pay_btn.style.display = "none";
    no_options.style.display = 'block';
  }
}

window.addEventListener('load', which_button_to_show);

// get call
async function getCall(upiName) {
  try {
    const response = await fetch(`http://localhost:8080/${upiName}`, {
      method: "GET",
    });

    if (response.status == 200) {
      console.log("GET request successful.");
    } 
    else {
      console.error("GET request not successful");
    }
  }
   catch (error) {
    console.error("Error!! Unable to get GET request");
  }
}

btn.forEach(function(button) {
  button.addEventListener('click', async function() {
    const upiName = button.classList[1];
    await getCall(upiName);
  });
});