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

    document.location.replace(`/day/workout/${workoutID}`);
}

document.querySelectorAll('.fa-square-minus').forEach(element => element.addEventListener('click', delWorkoutHandler));
document.querySelectorAll('.fa-pen-to-square').forEach(element => element.addEventListener('click', editWorkoutHandler));