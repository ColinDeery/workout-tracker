var exercisesApi = "https://api.api-ninjas.com/v1/exercises"
var apiKey = "5P6QO7VJRqnquUEJr7susQ==jNfogauqhz6Oe2kU";
var exercisesInfo = document.querySelector(".exercises-info")
var exercisesNameSection = document.querySelector("#exercise-name")
var exercisesDifficultySection = document.querySelector("#exercise-difficulty")
var exercisesInstructionsSection = document.querySelector("#exercise-instructions")
var exercisesEquipmentSection = document.querySelector("#exercise-equipment")
console.log(apiKey);



// form getter function at the very end will call fetchApi("Musclegroupname")
var type = 'strength';
function fetchApi() {
    fetch('https://api.api-ninjas.com/v1/exercises?type=' + type, {
        headers: {
            'X-Api-Key': '5P6QO7VJRqnquUEJr7susQ==jNfogauqhz6Oe2kU'
        },
    }).then(response => {
        console.log(response)
        if (response.ok) {
            return response.json()
        }
    }).then(data => {
        console.log(data)
        createExercises(data)
        // switch (type) {
        //     case ("cardio"):
        //         getCardioData(data)
        //         break;
        //     case (plyometrics):
        //         getPlyometricsData(data)
        //         break;
        //     case (powerlifting):
        //         getPowerliftingData(data)
        //         break;
        //     case (strength):
        //         getStrengthData(data)
        //         break;
        //     case (stretching):
        //         getStretchingData(data)
        //         break;
        //     default:
        //         break;
        // }
    }).catch(error => {
        console.log(error)
    })
}
fetchApi(type)
// function createExercises(data) {
//     var exerciseName = document.createElement("p");
//     var exerciseDifficulty = document.createElement("p");
//     var exerciseInstructions = document.createElement("p");
//     var exerciseEquipment = document.createElement("p");
//     console.log(data[0].name);
//     exerciseName.textContent = data[0].name;
//     exerciseDifficulty.textContent = data[0].difficulty;
//     exerciseEquipment.textContent = data[0].equipment;
//     exerciseInstructions.textContent = data[0].instructions;
//     exercisesNameSection.append(exerciseName);
//     exercisesDifficultySection.append(exerciseDifficulty);
//     exercisesEquipmentSection.append(exerciseEquipment);
//     exercisesInstructionsSection.append(exerciseInstructions);

// }

const createExercises = function(data){
    console.log(data);
    const exerciseData = [
        {
            name: data[0].name,
            dificulty: data[0].difficulty,
            equipment: data[0].equipment,
            instructions: data[0].instructions
        },
        {
            name: data[1].name,
            dificulty: data[1].difficulty,
            equipment: data[1].equipment,
            instructions: data[1].instructions
        },
        {
            name: data[2].name,
            dificulty: data[2].difficulty,
            equipment: data[2].equipment,
            instructions: data[2].instructions
        },
        {
            name: data[3].name,
            dificulty: data[3].difficulty,
            equipment: data[3].equipment,
            instructions: data[3].instructions
        },
        {
            name: data[4].name,
            dificulty: data[4].difficulty,
            equipment: data[4].equipment,
            instructions: data[4].instructions
        },
        {
            name: data[5].name,
            dificulty: data[5].difficulty,
            equipment: data[5].equipment,
            instructions: data[5].instructions
        },
        {
            name: data[6].name,
            dificulty: data[6].difficulty,
            equipment: data[6].equipment,
            instructions: data[6].instructions
        },
        {
            name: data[7].name,
            dificulty: data[7].difficulty,
            equipment: data[7].equipment,
            instructions: data[7].instructions
        },
        {
            name: data[8].name,
            dificulty: data[8].difficulty,
            equipment: data[8].equipment,
            instructions: data[8].instructions
        },
        {
            name: data[9].name,
            dificulty: data[9].difficulty,
            equipment: data[9].equipment,
            instructions: data[9].instructions
        }
    ]

    let arrayIndex = Math.floor(Math.random() * exerciseData.length);
    document.getElementById("exercise-type").innerHTML = type;
    document.getElementById("exercise-name").innerHTML = exerciseData[arrayIndex].name;
    document.getElementById("exercise-difficulty").innerHTML = exerciseData[arrayIndex].dificulty;
    document.getElementById("exercise-equipment").innerHTML = exerciseData[arrayIndex].equipment;
    document.getElementById("exercise-instructions").innerHTML = exerciseData[arrayIndex].instructions;
    
}

var submitBtnEl = document.querySelector("#generate")
var formEl = document.querySelector("#suggested-workout-options")
var populatedDataEl = document.querySelector(".populated-data")
submitBtnEl.addEventListener("click", function(event){
    formEl.classList.add("hide");
    populatedDataEl.classList.remove("hide");
    event.preventDefault()
    // fetchApi(type);
    })


// document.querySelector('form').addEventListener('generate', createExercises);

// const addWorkoutHandler = (event) => {
//     console.log('Add Workout button clicked');

//     document.location.replace('/day/workout?addWorkout=true');
// }

// document.querySelector('#add-workout').addEventListener('click', addWorkoutHandler);