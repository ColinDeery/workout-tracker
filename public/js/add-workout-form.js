const categoryEl = document.querySelector('#category');
const cardioForm = document.querySelector('#cardio');
const strengthForm = document.querySelector('#strength');
const yogaForm = document.querySelector('#yoga');
const recoveryForm = document.querySelector('#recovery');
let categoryChoice;

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

