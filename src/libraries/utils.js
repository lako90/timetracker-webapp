import moment from 'moment';

const timeDisplayFormat = 'H:mm';
const dateParseFormat = `YYYY-MM-DD ${timeDisplayFormat}`;

const generateRandomKey = () => parseInt(Math.random() * 999, 10);

const prepareToMoment = (date, time) => `${date} ${time}`;

const calculateTimeDiff = (entrances, exits, date, format = 'minute') => {
  let sum = 0;

  entrances.forEach((entrance, index) => {
    if (exits[index]) {
      sum += moment(
        prepareToMoment(date, exits[index]),
        dateParseFormat,
      ).diff(
        moment(
          prepareToMoment(date, entrance),
          dateParseFormat,
        ),
        format,
      );
    }
  });


  return sum;
};

export {
  calculateTimeDiff,
  dateParseFormat,
  generateRandomKey,
  prepareToMoment,
  timeDisplayFormat,
};
