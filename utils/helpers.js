const get_edit_form = (workout) => {
    if (workout.category === 'Cardio') {
        return `<h2 id="category">Cardio</h2>
    <section id="cardio">
        <section class="d-flex flex-column">
            <label for="cardio-exercise">Exercise:</label>
            <input type="text" id="cardio-exercise" value="${workout.exercise}">

            <label for="cardio-duration">Duration:</label>
            <input type="text" id="cardio-duration" value="${workout.duration}">

            <label for="cardio-distance">Distance:</label>
            <input type="text" id="cardio-distance" value="${workout.distance}">
        </section>
    </section>`;
    } else if (workout.category === 'Strength Training') {
        return `<h2 id="category">Strength Training</h2>
    <section id="strength">
        <section class="d-flex flex-column">
            <label for="strength-exercise">Exercise:</label>
            <input type="text" id="strength-exercise" value="${workout.exercise}">

            <label for="sets">Sets:</label>
            <input type="text" id="sets" value="${workout.sets}">

            <label for="reps">Reps:</label>
            <input type="text" id="reps" value="${workout.reps}">

            <label for="weight">Weight &#40;lbs&#41;:</label>
            <input type="text" id="weight" value="${workout.weight}">
        </section>
    </section>`;
    } else if (workout.category === 'Yoga/Pilates') {
        return `<h2 id="category">Yoga/Pilates</h2>
    <section id="yoga">
        <section class="d-flex flex-column">
            <label for="yoga-duration">Duration:</label>
            <input type="text" id="yoga-duration" value="${workout.duration}">

            <label for="yoga-notes">Notes:</label>
            <input type="text" id="yoga-notes" value="${workout.notes}">
        </section>
    </section>`;
    } else if (workout.category === 'Recovery/Stretching') {
        return `<h2 id="category">Recovery/Stretching</h2>
    <section id="recovery">
        <section class="d-flex flex-column">
            <label for="recovery-duration">Duration:</label>
            <input type="text" id="recovery-duration" value="${workout.duration}">

            <label for="recovery-notes">Notes:</label>
            <input type="text" id="recovery-notes" value="${workout.notes}">
        </section>
    </section>`;
    }
}

module.exports = {
    get_edit_form
};
