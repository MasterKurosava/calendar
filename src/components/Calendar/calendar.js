const DAYS_IN_WEEK = 7;
const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function leapYear(year) {
  return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}
export function areEqual(a, b) {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function getDaysInMonth(date) {
  const month = date.getMonth();
  const year = date.getFullYear();
  if (leapYear(year) && month === 1) {
    return DAYS_IN_MONTH[month] + 1;
  } else {
    return DAYS_IN_MONTH[month];
  }
}

function getDayOfWeek(date) {
  const dayOfWeek = date.getDay();
  if (dayOfWeek === 0) return 6;
  return dayOfWeek - 1;
}

export function getMonthData(year, month) {
  const result = [];
  const date = new Date(year, month);
  const daysInMonth = getDaysInMonth(date);
  const monthStartsOn = getDayOfWeek(date);
  let day = 1;

  for (let i = 0; i < (daysInMonth + monthStartsOn) / DAYS_IN_WEEK; i++) {
    result[i] = [];

    for (let j = 0; j < DAYS_IN_WEEK; j++) {
      if ((i === 0 && j < monthStartsOn) || day > daysInMonth) {
        result[i][j] = undefined;
      } else {
        result[i][j] = new Date(year, month, day++)
      }
    }
  }

  let firstDay, lastDay;
  for (let i = 0; i < DAYS_IN_WEEK; i++) {
    if (!result[0][i - 1] && result[0][i] && !firstDay) firstDay = i;
    if (result[result.length - 1][i] && result[result.length - 1][i + 1] == null) {
      lastDay = i;
    }
  }
  const lastMonthLastDay = getDaysInMonth(new Date(year, month-1)) - firstDay;
  for (let i = 0; i < firstDay; i++) {
    result[0][i] = lastMonthLastDay + i + 1;
  }
  let nextDays = 1;
  for (let i = lastDay + 1; i < DAYS_IN_WEEK; i++) {
    result[result.length - 1][i] = nextDays;
    nextDays++;
  }

  return result;
}