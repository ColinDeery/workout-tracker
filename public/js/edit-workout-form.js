const updateWorkoutHandler = async (event) => {
    event.preventDefault();
    console.log('Update button clicked');

    const categoryChoice = document.querySelector('.category').textContent;
    console.log(categoryChoice);

    const requestBody = {};
    if (categoryChoice === 'Cardio') {
        requestBody.exercise = document.querySelector('#cardio-exercise').value;
        requestBody.duration = document.querySelector('#cardio-duration').value;
        requestBody.distance = document.querySelector('#cardio-distance').value;
    } else if (categoryChoice === 'Strength Training') {
        requestBody.exercise = document.querySelector('#strength-exercise').value;
        requestBody.sets = document.querySelector('#sets').value;
        requestBody.reps = document.querySelector('#reps').value;
        requestBody.weight = document.querySelector('#weight').value;
    } else if (categoryChoice === 'Yoga/Pilates') {
        requestBody.duration = document.querySelector('#yoga-duration').value;
        requestBody.notes = document.querySelector('#yoga-notes').value;
    } else if (categoryChoice === 'Recovery/Stretching') {
        requestBody.duration = document.querySelector('#recovery-duration').value;
        requestBody.notes = document.querySelector('#recovery-notes').value;
    }

    console.log(requestBody);

    let workoutID = window.location.href.split('/');
    workoutID = workoutID[workoutID.length-1]; 
    console.log(workoutID);

    const response = await fetch(`/api/workout/${workoutID}`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
    });

    // If response is ok, redirect user back to /day and show updated list of workouts
    if (response.ok) {
        console.log('Successfully updated workout!');
        document.location.replace('/day');
    } else {
        alert('Failed to update workout.');
    }
}

// Exit Update Workout form and return to /day view
const exitFormHandler = (event) => {
    document.location.replace('/day');
}

document.querySelector('form').addEventListener('submit', updateWorkoutHandler);
document.querySelector('.bi-x-square').addEventListener('click', exitFormHandler);