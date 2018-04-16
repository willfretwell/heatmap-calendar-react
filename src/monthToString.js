function findMonthString(month, short) {
    switch (month) {
        case 0: return short ? "Jan" : "January";
        case 1: return short ? "Feb" : "February";
        case 2: return short ? "Mar" : "March";
        case 3: return short ? "Apr" : "April";
        case 4: return short ? "May" : "May";
        case 5: return short ? "Jun" : "June";
        case 6: return short ? "Jul" : "July";
        case 7: return short ? "Aug" : "August";
        case 8: return short ? "Sep" : "September";
        case 9: return short ? "Oct" : "October";
        case 10: return short ? "Nov" : "November";
        case 11: return short ? "Dec" : "December";
        default: ;
    }
}

export default findMonthString;