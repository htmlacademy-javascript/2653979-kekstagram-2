function stringLength(string, maxLength) {
  if (string.length <= maxLength){
    return true;
  }
  return false;
}

function isPalimdor(string){
  const simpleString = string.replaceAll(' ', '').toLowerCase();
  let stringReverse = '';

  for (let i = simpleString.length - 1; i >= 0; i--){
    stringReverse += simpleString[i];
  }
  return stringReverse === simpleString;
}

function numberInString(string){
  string.toString();
  let number = '';
  for (let i = 0; i <= string.length; i++){
    if (+string[i]){
      number += string[i];
    }
  }
  return number ? Number(number) : NaN;
}

stringLength('проверяемая строка', 20);
isPalimdor('топот');
numberInString('1 кефир, 0.5 батона');
