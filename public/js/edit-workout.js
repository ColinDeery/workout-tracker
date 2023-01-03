// If user clicks on minus btn, delete that workout
const delWorkoutHandler = async (event) => {
    console.log('Delete button clicked');

    // Find closest parent element with 'card' class
    // Grab ID of the workout card that was clicked on
    const workoutID = event.target.closest('.card').id.split('-')[1];
    console.log(workoutID);

    const response = await fetch(`/api/workout/${workoutID}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        console.log('Deleted workout successfully!');
        document.location.replace('/day');
    } else {
        alert('Failed to delete workout.');
    }
}

// If user clicks on pen icon, update that workout
const editWorkoutHandler = async (event) => {
    console.log('Edit workout button clicked');

    // Grab ID of the workout card that was clicked on
    const workoutID = event.target.closest('.card').id.split('-')[1];
    console.log(workoutID);

    document.location.replace(`/day/workout/${workoutID}?updateWorkout=true`);
}

// If user clicked on Mark Complete btn, show green checkmark
const toggleToComplete = async (event) => {
    console.log('Mark Complete button clicked');

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
        console.log('Marked workout complete!');
        location.reload();
    } else {
        alert('Failed to mark workout complete.');
    }
}

// If user clicked on green checkmark icon, show Mark Complete btn
const toggleToIncomplete = async (event) => {
    console.log('Green checkmark clicked');

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
        console.log('Marked workout incomplete');
        location.reload();
    } else {
        alert('Failed to mark workout incomplete.');
    }
}

document.querySelectorAll('.bi-x-square-fill').forEach(element => element.addEventListener('click', delWorkoutHandler));
document.querySelectorAll('.bi-pencil-square').forEach(element => element.addEventListener('click', editWorkoutHandler));
// Clicked on green checkmark icon
document.querySelectorAll('.complete').forEach(element => element.addEventListener('click', toggleToIncomplete));
// Clicked on Mark Complete button
document.querySelectorAll('.incomplete').forEach(element => element.addEventListener('click', toggleToComplete));