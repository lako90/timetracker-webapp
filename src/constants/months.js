import unionBy from 'lodash/unionBy';

const months = [
  { name: 'january', days: 31 },
  { name: 'february', days: 28 },
  { name: 'march', days: 31 },
  { name: 'april', days: 30 },
  { name: 'may', days: 31 },
  { name: 'june', days: 30 },
  { name: 'july', days: 31 },
  { name: 'august', days: 31 },
  { name: 'september', days: 30 },
  { name: 'october', days: 31 },
  { name: 'november', days: 30 },
  { name: 'december', days: 31 },
];

const leapYear = () => unionBy(
  months,
  [{ name: 'february', days: 29 }],
  'name',
);

const getMonths = (year) => {
  if (
    year % 4 === 0
    && year % 100 === 0
    && year % 400 === 0
  ) {
    return leapYear(months);
  }

  return months;
};

export { months };
export default getMonths;
