function isLeapYear(date) {
    var year = date.getFullYear();
    var answer = new Date(year, 1, 29).getDate() === 29;
    return answer;
}

function getDOY(date) {
    var dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
    var m = date.getMonth();
    var dayOfYear = dayCount[m] + date.getDate();
    return m > 1 && isLeapYear(date) ? dayOfYear + 1 : dayOfYear;
}

function daysInMonth(month) {
    var dayCount = [31, isLeapYear(dateNow()) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return dayCount[month];
}

function dateNow() {
    return new Date(Date.now());
}

function daysInYear() {
    return isLeapYear(dateNow()) ? 366 : 365;
}

export default {getDOY, daysInYear, daysInMonth, dateNow};