const addWorkoutHandler = (event) => {
    console.log('Add Workout button clicked');

    document.location.replace('/day/workout?addWorkout=true');
}

document.querySelector('#add-workout').addEventListener('click', addWorkoutHandler);