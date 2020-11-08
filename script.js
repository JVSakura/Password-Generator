// Assignment Code
var generateBtn = document.querySelector("#generate");

const CHAR_TYPE = {
  LOWER: 0,
  UPPER: 1,
  NUMBER: 2,
  SPECIAL: 3,
}



const getCharCodeType = (charCode) => {

  if (96 < charCode && charCode < 123) {
    return CHAR_TYPE.LOWER;
  } else if (64 < charCode && charCode < 91) {
    return CHAR_TYPE.UPPER;
  } else if (47 < charCode && charCode < 58) {
    return CHAR_TYPE.NUMBER;
  } else {
    return CHAR_TYPE.SPECIAL;
  }
}

function generatePassword() {
  let valid = false;
  let passwordLen = 0
  while (!valid) {
    passwordLen = prompt(`Enter a password length between 8 and 128`);
    passwordLen = parseInt(passwordLen)
    if (passwordLen < 8 || passwordLen > 128 || passwordLen === NaN) {
      alert(`Invalid length. Try again.`)
    } else {
      valid = true;
    }
  }
  let types = [false, false, false, false]

  valid = false;
  while (!valid) {
    types[CHAR_TYPE.LOWER] = confirm(`Lowercase characters?`)
    types[CHAR_TYPE.UPPER] = confirm(`Uppercase characters?`)
    types[CHAR_TYPE.NUMBER] = confirm(`Numeric characters?`)
    types[CHAR_TYPE.SPECIAL] = confirm(`Special characters?`)
    if (types[0] || types[1] || types[2] || types[3]) {
      valid = true;
    } else {
      alert(`You must select at least one type.`)
    }
  }

  let chars = []
  let charBound = [[0, 0], [0, 0], [0, 0], [0, 0]];
  if (types[CHAR_TYPE.LOWER]) {
    for (let i = 97; i < 123; i++) {
      charBound[0][0] = chars.length;
      chars.push(i);
      charBound[0][1] = chars.length
    }
  }
  if (types[CHAR_TYPE.UPPER]) {
    for (let i = 65; i < 91; i++) {
      charBound[1][0] = chars.length;
      chars.push(i);
      charBound[1][1] = chars.length;
    }
  }
  if (types[CHAR_TYPE.NUMBER]) {
    for (let i = 48; i < 58; i++) {
      charBound[2][0] = chars.length;
      chars.push(i);
      charBound[2][1] = chars.length;
    }
  }
  if (types[CHAR_TYPE.SPECIAL]) {
    charBound[3][0] = chars.length;
    for (let i = 126; i > 122; i--) {
      chars.push(i);
    }
    for (let i = 96; i > 90; i--) {
      chars.push(i);
    }
    for (let i = 64; i > 57; i--) {
      chars.push(i);
    }
    for (let i = 47; i > 32; i--) {
      chars.push(i);
    }
    charBound[3][1] = chars.length;
  }
  let charsLen = chars.length;
  let tally = [0, 0, 0, 0];
  let randNum = 0;
  let password = "";

  for (let i = 0; i < passwordLen; i++) {
    randNum = Math.floor(Math.random() * charsLen);
    let charType = getCharCodeType(chars[randNum]);
    tally[charType]++;
    password += String.fromCharCode(chars[randNum])
  }

  for (let i = 0; i < 4; i++) {
    if (types[i] && tally[i] === 0) {
      let validIndexs = []
      for (let j = 0; j < passwordLen; j++) {
        validIndexs.push(j)
      }
      for (let j = passwordLen; j > 0; j--) {
        let randNum = Math.floor(Math.random() * j)
        let charCode = password.charCodeAt(validIndexs[randNum]);
        let charCodeType = getCharCodeType(charCode)
        if (tally[charCodeType] > 1) {
          let randChar = Math.floor(Math.random() * (charBound[i][1] - charBound[i][0])) + charBound[i][0]
          password = password.substr(0, validIndexs[randNum]) + String.fromCharCode(chars[randChar]) + password.substr(validIndexs[randNum] + 1)
          tally[i]++
          j = 0;

        } else {
          validIndexs.splice(randNum, 1);
        }
      }
    }
  }

  return password


}
// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
