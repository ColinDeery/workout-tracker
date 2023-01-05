// If user clicks on minus btn, delete that workout
const delWorkoutHandler = async (event) => {
    // Find closest parent element with 'card' class
    // Grab ID of the workout card that was clicked on
    const workoutID = event.target.closest('.card').id.split('-')[1];

    const response = await fetch(`/api/workout/${workoutID}`, {
        method: 'DELETE'
    });

    const arrURL = document.location.href.split('/');
    const date = arrURL[arrURL.length - 1];

    if (response.ok) {
        document.location.replace(`/calendar/day/${date}`);
    } else {
        alert('Failed to delete workout.');
    }
}

// If user clicks on pen icon, update that workout
const editWorkoutHandler = async (event) => {
    // Grab ID of the workout card that was clicked on
    const workoutID = event.target.closest('.card').id.split('-')[1];

    const arrURL = document.location.href.split('/');
    const date = arrURL[arrURL.length - 1];

    document.location.replace(`/calendar/day/${date}/workout/${workoutID}?updateWorkout=true`);
}

// If user clicked on Mark Complete btn, show green checkmark
const toggleToComplete = async (event) => {
    // Grab ID of the workout card that was clicked on
    const workoutID = event.target.closest('.card').id.split('-')[1];

    // Change "completed" to true
    const response = await fetch(`/api/workout/${workoutID}`, {
        method: 'PUT',
        body: JSON.stringify({
            completed: true
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        location.reload();
    } else {
        alert('Failed to mark workout complete.');
    }
}

// If user clicked on green checkmark icon, show Mark Complete btn
const toggleToIncomplete = async (event) => {
    // Grab ID of the workout card that was clicked on
    const workoutID = event.target.closest('.card').id.split('-')[1];

    // Change "completed" to false
    const response = await fetch(`/api/workout/${workoutID}`, {
        method: 'PUT',
        body: JSON.stringify({
            completed: false
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        location.reload();
    } else {
        alert('Failed to mark workout incomplete.');
    }
}

document.querySelectorAll('.bi-x-square').forEach(element => element.addEventListener('click', delWorkoutHandler));
document.querySelectorAll('.bi-pencil-square').forEach(element => element.addEventListener('click', editWorkoutHandler));
// Clicked on green checkmark icon
document.querySelectorAll('.complete').forEach(element => element.addEventListener('click', toggleToIncomplete));
// Clicked on Mark Complete button
document.querySelectorAll('.incomplete').forEach(element => element.addEventListener('click', toggleToComplete));