const updateWorkoutHandler = async (event) => {
    event.preventDefault();

    const categoryChoice = document.querySelector('.category').textContent;

    const requestBody = {};
    if (categoryChoice === 'Cardio') {
        requestBody.exercise = document.querySelector('#cardio-exercise').value;
        requestBody.duration = document.querySelector('#cardio-duration').value;
        requestBody.distance = document.querySelector('#cardio-distance').value;
        requestBody.notes = document.querySelector('#cardio-notes').value;
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
        requestBody.notes = document.querySelector('#strength-notes').value;
    } else if (categoryChoice === 'Yoga/Pilates') {
        requestBody.exercise = document.querySelector('#yoga-exercise').value;
        requestBody.duration = document.querySelector('#yoga-duration').value;
        requestBody.notes = document.querySelector('#yoga-notes').value;
    } else if (categoryChoice === 'Recovery/Stretching') {
        requestBody.exercise = document.querySelector('#recovery-exercise').value;
        requestBody.duration = document.querySelector('#recovery-duration').value;
        requestBody.notes = document.querySelector('#recovery-notes').value;
    }

    let workoutID = window.location.href.split('/');
    workoutID = workoutID[workoutID.length-1]; 

    const response = await fetch(`/api/workout/${workoutID}`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
    });

    const arrURL = document.location.href.split('/');
    const date = arrURL[arrURL.length - 3];

    // If response is ok, redirect user back to /day and show updated list of workouts
    if (response.ok) {
        document.location.replace(`/calendar/day/${date}`);
    } else {
        alert('Failed to update workout.');
    }
}

// Exit Update Workout form and return to /day view
const exitFormHandler = (event) => {
    const arrURL = document.location.href.split('/');
    const date = arrURL[arrURL.length - 3];
    document.location.replace(`/calendar/day/${date}`);
}

document.querySelector('form').addEventListener('submit', updateWorkoutHandler);
document.querySelector('.bi-x-square').addEventListener('click', exitFormHandler);