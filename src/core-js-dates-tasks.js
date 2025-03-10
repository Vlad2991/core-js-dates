/** ********************************************************************************************
 *                                                                                             *
 * Please read the following tutorial before implementing tasks:                               *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date       *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#date_object *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl       *
 *                                                                                             *
 ********************************************************************************************* */

/**
 * By the passed date returns the number of seconds elapsed since 00:00 01.01.1970.
 *
 * @param {string} date - date and time.
 * @return {number} milliseconds in timestamp.
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 0
 * '04 Dec 1995 00:12:00 UTC' => 818035920000
 */
function dateToTimestamp(date) {
  return new Date(date).getTime();
}

function getTime(date) {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function getDayName(date) {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) {
    throw new Error('Invalid date format');
  }
  return days[parsedDate.getDay()];
}

function getNextFriday(date) {
  const nextFriday = new Date(date);
  nextFriday.setDate(date.getDate() + ((5 - date.getDay() + 7) % 7 || 7));
  return nextFriday;
}

function getCountDaysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

function getCountDaysOnPeriod(dateStart, dateEnd) {
  const start = new Date(dateStart);
  const end = new Date(dateEnd);
  return Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
}

function isDateInPeriod(date, period) {
  const checkDate = new Date(date);
  const startDate = new Date(period.start);
  const endDate = new Date(period.end);
  return checkDate >= startDate && checkDate <= endDate;
}

function formatDate(date) {
  const options = {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  };
  return new Date(date).toLocaleString('en-US', options);
}

function getCountWeekendsInMonth(month, year) {
  let count = 0;
  const date = new Date(year, month - 1, 1);
  while (date.getMonth() === month - 1) {
    if (date.getDay() === 0 || date.getDay() === 6) {
      count += 1;
    }
    date.setDate(date.getDate() + 1);
  }
  return count;
}

function getWeekNumberByDate(date) {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDays = (date - startOfYear) / (1000 * 60 * 60 * 24);
  return Math.ceil((pastDays + startOfYear.getDay() + 1) / 7);
}

function getNextFridayThe13th(date) {
  const nextDate = new Date(date);
  nextDate.setDate(13);
  while (nextDate.getDay() !== 5 || nextDate <= date) {
    nextDate.setMonth(nextDate.getMonth() + 1);
  }
  return nextDate;
}

function getQuarter(date) {
  return Math.floor(date.getMonth() / 3) + 1;
}

function getWorkSchedule(period, countWorkDays, countOffDays) {
  const schedule = [];
  const startDate = new Date(period.start.split('-').reverse().join('-'));
  const endDate = new Date(period.end.split('-').reverse().join('-'));

  while (startDate <= endDate) {
    for (let i = 0; i < countWorkDays && startDate <= endDate; i += 1) {
      schedule.push(
        startDate.toISOString().split('T')[0].split('-').reverse().join('-')
      );
      startDate.setDate(startDate.getDate() + 1);
    }
    startDate.setDate(startDate.getDate() + countOffDays);
  }

  return schedule;
}

function isLeapYear(date) {
  const year = date.getFullYear();
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

module.exports = {
  dateToTimestamp,
  getTime,
  getDayName,
  getNextFriday,
  getCountDaysInMonth,
  getCountDaysOnPeriod,
  isDateInPeriod,
  formatDate,
  getCountWeekendsInMonth,
  getWeekNumberByDate,
  getNextFridayThe13th,
  getQuarter,
  getWorkSchedule,
  isLeapYear,
};
