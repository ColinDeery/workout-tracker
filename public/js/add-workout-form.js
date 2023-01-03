const categoryEl = document.querySelector('#category');
const cardioForm = document.querySelector('#cardio');
const strengthForm = document.querySelector('#strength');
const yogaForm = document.querySelector('#yoga');
const recoveryForm = document.querySelector('#recovery');
// CategoryChoice will be "Cardio" by default
let categoryChoice = categoryEl.options[categoryEl.selectedIndex].text;

// Display appropriate form based on which workout category user selects
categoryEl.onchange = function () {
    // Hide all forms initially
    cardioForm.style.display = 'none';
    strengthForm.style.display = 'none';
    yogaForm.style.display = 'none';
    recoveryForm.style.display = 'none';

    // Check which category user selected and display that corresponding form
    categoryChoice = categoryEl.options[categoryEl.selectedIndex].text;    
    if (categoryChoice === 'Cardio') {  
        cardioForm.style.display = 'block'; 
    } else if (categoryChoice === 'Strength Training') {
        strengthForm.style.display = 'block';
    } else if (categoryChoice === 'Yoga/Pilates') {
        yogaForm.style.display = 'block';
    } else if (categoryChoice === 'Recovery/Stretching') {
        recoveryForm.style.display = 'block';
    }
}

// Create POST request to add workout info to planner
const submitWorkoutHandler = async (event) => {
    event.preventDefault();
    console.log('Complete button clicked');

    // Set the form input values in the appropriate keys on request body
    const requestBody = {};
    requestBody.category = categoryChoice;
    if (categoryChoice === 'Cardio') {
        requestBody.exercise = document.querySelector('#cardio-exercise').value;
        requestBody.duration = document.querySelector('#cardio-duration').value;
        requestBody.distance = document.querySelector('#cardio-distance').value;
    } else if (categoryChoice === 'Strength Training') {
        requestBody.exercise = document.querySelector('#strength-exercise').value;
        requestBody.sets = document.querySelector('#sets').value;
        if (requestBody.sets === '') {
            requestBody.sets = null;
        }
        requestBody.reps = document.querySelector('#reps').value;
        if (requestBody.reps === '') {
            requestBody.reps = null;
        }
        requestBody.weight = document.querySelector('#weight').value;
    } else if (categoryChoice === 'Yoga/Pilates') {
        requestBody.duration = document.querySelector('#yoga-duration').value;
        requestBody.notes = document.querySelector('#yoga-notes').value;
    } else if (categoryChoice === 'Recovery/Stretching') {
        requestBody.duration = document.querySelector('#recovery-duration').value;
        requestBody.notes = document.querySelector('#recovery-notes').value;
    }

    // Add current date to requestBody
    console.log(document.location.href);
    const arrURL = document.location.href.split('/');
    const date = arrURL[arrURL.length - 2];
    requestBody.date = date;

    const response = await fetch('/api/workout/', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        console.log('Successfully added workout!');
        document.location.replace(`/calendar/day/${date}`);
    } else {
        alert('Failed to add workout.');
    }
}

// Exit Add Workout form and return to /day view
const exitFormHandler = (event) => {
    const arrURL = document.location.href.split('/');
    const date = arrURL[arrURL.length - 2];
    document.location.replace(`/calendar/day/${date}`);
}

document.querySelector('form').addEventListener('submit', submitWorkoutHandler);
document.querySelector('.bi-x-square').addEventListener('click', exitFormHandler);
