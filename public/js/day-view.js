var exercisesApi = "https://api.api-ninjas.com/v1/exercises"
var apiKey = "5P6QO7VJRqnquUEJr7susQ==jNfogauqhz6Oe2kU";
var exercisesInfo = document.querySelector(".exercises-info")
var exercisesNameSection = document.querySelector("#exercise-name")
var exercisesDifficultySection = document.querySelector("#exercise-difficulty")
var exercisesInstructionsSection = document.querySelector("#exercise-instructions")
console.log(apiKey);



// form getter function at the very end will call fetchApi("Musclegroupname")
var muscle = 'biceps';
function fetchApi(){
    fetch('https://api.api-ninjas.com/v1/exercises?muscle=' + muscle,{
      headers: {
        'X-Api-Key': '5P6QO7VJRqnquUEJr7susQ==jNfogauqhz6Oe2kU'
      },
    }).then(response =>{
        console.log(response)
        if(response.ok){
            return response.json()
        }
    }).then(data=> {
        console.log(data)
        createExercises(data)
    }).catch(error=>{
        console.log(error)
    })
}
fetchApi(muscle)
function createExercises(data){
    var exerciseName = document.createElement("p");
    var exerciseDifficulty = document.createElement("p");
    var exerciseInstructions = document.createElement("p");
    console.log(data[0].name);
    exerciseName.textContent = data[0].name;
    exerciseDifficulty.textContent = data[0].difficulty;
    exerciseInstructions.textContent = data[0].instructions;
    exercisesNameSection.append(exerciseName);
    exercisesDifficultySection.append(exerciseDifficulty);
    exercisesInstructionsSection.append(exerciseInstructions);
    
}

