const ifEquals = (arg1, arg2) => {
    return (arg1 === arg2);
}

// date is in YYYY-MM-DD format
const format_date = (date) => {
    const [year, month, day] = date.split('-');
    const dateObj = new Date(year, month - 1, day);

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    return dateObj.toLocaleString("en-US", options);
}

module.exports = {
    ifEquals,
    format_date
};
