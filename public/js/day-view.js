const addWorkoutHandler = (event) => {
    console.log('Add Workout button clicked');

    document.location.replace('/day/workout?addWorkout=true');
}

// Only add event listener if 'Add Workout' button exists
const addWorkoutBtn = document.querySelector('#add-workout');
if (addWorkoutBtn) {
    addWorkoutBtn.addEventListener('click', addWorkoutHandler);
}