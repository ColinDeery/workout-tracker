const dayjs = require('dayjs');
const weekday = require("dayjs/plugin/weekday");
dayjs.extend(weekday)
// const weekOfYear = require("dayjs/plugin/weekOfYear");

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// daysOfWeek.forEach((weekday) => {
//     const weekDayElement = document.createElement("li");
//     daysOfWeekElement.appendChild(weekDayElement);
//     weekDayElement.innerText = weekday;
//   });