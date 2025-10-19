const stringLength = (string, maxLength) => string.length <= maxLength;

const isPalimdor = (string) =>{
  const simpleString = string.replaceAll(' ', '').toLowerCase();
  let stringReverse = '';

  for (let i = simpleString.length - 1; i >= 0; i--){
    stringReverse += simpleString[i];
  }
  return stringReverse === simpleString;
};

const numberInString = (string) => {
  string.toString();
  let number = '';
  for (let i = 0; i <= string.length; i++){
    if (+string[i]){
      number += string[i];
    }
  }
  return number ? Number(number) : NaN;
};

stringLength('проверяемая строка', 20);
isPalimdor('топот');
numberInString('1 кефир, 0.5 батона');

const getDate = (dayStart, dayEnd, timeStart, duration) =>{
  const convertToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };
  const dayStartMinutes = convertToMinutes(dayStart);
  const dayEndMinutes = convertToMinutes(dayEnd);
  const meetingStartMinutes = convertToMinutes(timeStart);
  const meetingEndMinutes = meetingStartMinutes + duration;
  return meetingStartMinutes >= dayStartMinutes && meetingEndMinutes <= dayEndMinutes;
};

getDate('08:00', '17:30', '14:00', 90);
