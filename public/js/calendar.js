dayjs.extend(window.dayjs_plugin_weekday);
dayjs.extend(window.dayjs_plugin_weekOfYear);

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TODAY = dayjs().format("YYYY-MM-DD");

const INITIAL_YEAR = dayjs().format("YYYY");
const INITIAL_MONTH = dayjs().format("M");

let selectedMonth = dayjs(new Date(INITIAL_YEAR, INITIAL_MONTH - 1, 1));
let currentMonthDays;
let previousMonthDays;
let nextMonthDays;

const daysOfWeekElement = document.getElementById("days-of-week");

// Create header with the days of the week
WEEKDAYS.forEach((weekday) => {
    const weekDayElement = document.createElement("li");
    daysOfWeekElement.appendChild(weekDayElement);
    weekDayElement.innerText = weekday;
});

createCalendar();
initMonthSelectors();
renderDayPreview();

function clickDayHandler(event) {
    const date = event.target.closest('.calendar-day').id;
    console.log(date);

    document.location.replace(`/calendar/day/${date}`);
}

function createCalendar(year = INITIAL_YEAR, month = INITIAL_MONTH) {
    const calendarDaysElement = document.getElementById("calendar-days");

    // Current month and year in top left corner
    document.getElementById("selected-month").innerText = dayjs(
        new Date(year, month - 1)
    ).format("MMMM YYYY");

    // document.getElementById("present-month-selector").innerText = dayjs(
    //     new Date(year, month -1)
    // ).format("MMMM YYYY");

    removeAllDayElements(calendarDaysElement);

    currentMonthDays = createDaysForCurrentMonth(
        year,
        month,
        dayjs(`${year}-${month}-01`).daysInMonth()
    );

    previousMonthDays = createDaysForPreviousMonth(year, month);

    nextMonthDays = createDaysForNextMonth(year, month);

    const days = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];

    days.forEach((day) => {
        appendDay(day, calendarDaysElement);
    });

    // ADDED THIS
    console.log('Created calendar');
    document.querySelectorAll('.calendar-day').forEach(element => element.addEventListener('click', clickDayHandler));
}

function appendDay(day, calendarDaysElement) {
    const dayElement = document.createElement("li");
    const dayElementClassList = dayElement.classList;
    dayElementClassList.add("calendar-day", "d-flex", "justify-content-center");
    // Add the date as an ID to each dayElement
    dayElement.setAttribute('id', `${day.date}`);
    const dayOfMonthElement = document.createElement("span");
    dayOfMonthElement.innerText = day.dayOfMonth;
    dayElement.appendChild(dayOfMonthElement);
    calendarDaysElement.appendChild(dayElement);

    if (!day.isCurrentMonth) {
        dayElementClassList.add("calendar-day--not-current");
    }

    if (day.date === TODAY) {
        dayElementClassList.add("calendar-day--today");
    }  
}

// Render preview/indication of workouts scheduled for that day
function renderDayPreview () {
    const dayElements = document.querySelectorAll('.calendar-day');
    console.log(dayElements);

    const arrPromises = Array.from(dayElements, (day) => fetch(`/api/workout/${day.id}`));
    Promise.all(arrPromises)
        .then((responses) => {
            const responsesJSON = responses.map((res) => res.json());
            return Promise.all(responsesJSON);
        })
        .then((data) => {
            console.log(data);
            
            // Loop through each day on calendar
            for (let i = 0; i < data.length; i++) {
                // If day has saved workouts
                if (data[i].length > 0) {
                    const workoutsForDay = data[i];
                    let dayCompleted = true;
                    // Loop through each workout for that day
                    for (let j = 0; j < workoutsForDay.length; j++) {
                        if (!workoutsForDay[j].completed) {
                            dayCompleted = false;
                        }
                    }

                    // If all workouts for that day are completed, render green checkmark
                    if (dayCompleted) {
                        const completedIcon = document.createElement('i');
                        completedIcon.setAttribute('class', 'bi bi-check-circle-fill align-self-center');
                        completedIcon.setAttribute('style', 'font-size: 3.5rem; color: green');
                        dayElements[i].appendChild(completedIcon);
                    // Otherwise, change color of day element and render number of exercises/workouts for that day
                    } else {
                        const numWorkouts = document.createElement('h5');
                        numWorkouts.textContent = `Exercise(s): ${workoutsForDay.length}`;
                        numWorkouts.classList.add('align-self-center');
                        dayElements[i].appendChild(numWorkouts);
                        dayElements[i].setAttribute('style', 'background-color: #FAE3E1');
                    }
                }
            }
        });
}

function removeAllDayElements(calendarDaysElement) {
    let first = calendarDaysElement.firstElementChild;

    while (first) {
        first.remove();
        first = calendarDaysElement.firstElementChild;
    }
}

function getNumberOfDaysInMonth(year, month) {
    return dayjs(`${year}-${month}-01`).daysInMonth();
}

function createDaysForCurrentMonth(year, month) {
    return [...Array(getNumberOfDaysInMonth(year, month))].map((day, index) => {
        return {
            date: dayjs(`${year}-${month}-${index + 1}`).format("YYYY-MM-DD"),
            dayOfMonth: index + 1,
            isCurrentMonth: true
        };
    });
}

function createDaysForPreviousMonth(year, month) {
    const firstDayOfTheMonthWeekday = getWeekday(currentMonthDays[0].date);

    const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, "month");

    // Cover first day of the month being sunday (firstDayOfTheMonthWeekday === 0)
    const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
        ? firstDayOfTheMonthWeekday - 1
        : 6;

    const previousMonthLastMondayDayOfMonth = dayjs(currentMonthDays[0].date)
        .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
        .date();

    return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((day, index) => {
        return {
            date: dayjs(
                `${previousMonth.year()}-${previousMonth.month() + 1}-${previousMonthLastMondayDayOfMonth + index
                }`
            ).format("YYYY-MM-DD"),
            dayOfMonth: previousMonthLastMondayDayOfMonth + index,
            isCurrentMonth: false
        };
    });
}

function createDaysForNextMonth(year, month) {
    const lastDayOfTheMonthWeekday = getWeekday(
        `${year}-${month}-${currentMonthDays.length}`
    );

    const nextMonth = dayjs(`${year}-${month}-01`).add(1, "month");

    const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
        ? 7 - lastDayOfTheMonthWeekday
        : lastDayOfTheMonthWeekday;

    return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
        return {
            date: dayjs(
                `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
            ).format("YYYY-MM-DD"),
            dayOfMonth: index + 1,
            isCurrentMonth: false
        };
    });
}

function getWeekday(date) {
    return dayjs(date).weekday();
}

function initMonthSelectors() {
    document
        .getElementById("previous-month-selector")
        .addEventListener("click", function () {
            selectedMonth = dayjs(selectedMonth).subtract(1, "month");
            createCalendar(selectedMonth.format("YYYY"), selectedMonth.format("M"));
            renderDayPreview();
        });

    document
        .getElementById("present-month-selector")
        .addEventListener("click", function () {
            selectedMonth = dayjs(new Date(INITIAL_YEAR, INITIAL_MONTH - 1, 1));
            createCalendar(selectedMonth.format("YYYY"), selectedMonth.format("M"));
            renderDayPreview();
        });

    document
        .getElementById("next-month-selector")
        .addEventListener("click", function () {
            selectedMonth = dayjs(selectedMonth).add(1, "month");
            createCalendar(selectedMonth.format("YYYY"), selectedMonth.format("M"));
            renderDayPreview();
        });
}
