// Assignment Code
var generateBtn = document.querySelector("#generate");

function generatePassword() {
  // define all vars needed
  let length = parseInt(prompt("Choose a password length between 8 and 128 characters."))
  let upper = confirm("Would you like uppercase charcaters?")
  let lower = confirm("Would you like lowercase charcaters?")
  let nums = confirm("Would you like numeric characters?")
  let special = confirm("Would you like special characters?")
  let upperChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  let lowerChar = "abcdefghijklmnopqrstuvwxyz"
  let numsChar = "0123456789"
  let specialChar = "!@#$%^&*()_+=<>;:[]"

  if (length < 128 || length > 8) {
    let newPass = ""
    let newPassChar = ""
    if (upper) {
      newPassChar += upperChar
    }
    if (lower) {
      newPassChar += lowerChar
    }
    if (nums) {
      newPassChar += numsChar
    }
    if (special) {
      newPassChar += specialChar
    }

    for (let i = 0; i < length; i++) {
      let newChar = newPassChar[Math.floor(Math.random() * newPassChar.length)]
      newPass += newChar
    }
    console.log(newPass)
    return newPass
  } else {
    alert("Incorrect length chosen.")
  }

}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);