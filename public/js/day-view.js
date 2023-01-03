const exercisesApi = "https://api.api-ninjas.com/v1/exercises"
const apiKey = "5P6QO7VJRqnquUEJr7susQ==jNfogauqhz6Oe2kU";
const exercisesInfo = document.querySelector(".exercises-info")
const exercisesNameSection = document.querySelector("#exercise-name")
const exercisesDifficultySection = document.querySelector("#exercise-difficulty")
const exercisesInstructionsSection = document.querySelector("#exercise-instructions")
const exercisesEquipmentSection = document.querySelector("#exercise-equipment")
const typeEl = document.querySelector("#type")
const submitBtnEl = document.querySelector("#generate")
const clearBtnEl = document.querySelector("#clear")
const formEl = document.querySelector("#suggested-workout-options")
const populatedDataEl = document.querySelector(".populated-data")
console.log(apiKey);

//Submit button logic to select workout type and call api
submitBtnEl.addEventListener("click", function (event) {
    formEl.classList.add("hide");
    populatedDataEl.classList.remove("hide");
    event.preventDefault()
    // let type = typeEl.options[typeEl.selectedIndex].text;
    console.log(type);
    fetchApi();
})
//Button to clear data and repopulate form
clearBtnEl.addEventListener("click", function (event) {
    formEl.classList.remove("hide");
    populatedDataEl.classList.add("hide");
    event.preventDefault()
})

//Function to call API
function fetchApi() {
    fetch('https://api.api-ninjas.com/v1/exercises?type=' + typeEl.options[typeEl.selectedIndex].text, {
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
    }).catch(error => {
        console.log(error)
    })
}

//Function with data array and apend logic
const createExercises = function (data) {
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
    // Logic to populate randomized data to page
    let arrayIndex = Math.floor(Math.random() * exerciseData.length);
    document.getElementById("exercise-type").innerHTML = typeEl.options[typeEl.selectedIndex].text;
    document.getElementById("exercise-name").innerHTML = exerciseData[arrayIndex].name;
    document.getElementById("exercise-difficulty").innerHTML = exerciseData[arrayIndex].dificulty;
    document.getElementById("exercise-equipment").innerHTML = exerciseData[arrayIndex].equipment;
    document.getElementById("exercise-instructions").innerHTML = exerciseData[arrayIndex].instructions;

}

const addWorkoutHandler = (event) => {
    console.log('Add Workout button clicked');
    console.log(document.location.href);
    const arrURL = document.location.href.split('/');
    const date = arrURL[arrURL.length-1];
    console.log(date);
    document.location.replace(`/calendar/day/${date}/workout?addWorkout=true`);
}

// Only add event listener if 'Add Workout' button exists
const addWorkoutBtn = document.querySelector('#add-workout');
if (addWorkoutBtn) {
    addWorkoutBtn.addEventListener('click', addWorkoutHandler);
}

(function () {

    var scrollContainer = document.querySelector('.scrollable'),
        scrollContentWrapper = document.querySelector('.scrollable .content-wrapper'),
        scrollContent = document.querySelector('.scrollable .content'),
        contentPosition = 0,
        scrollerBeingDragged = false,
        scroller,
        topPosition,
        scrollerHeight;
    
    function calculateScrollerHeight() {
        // *Calculation of how tall scroller should be
        var visibleRatio = scrollContainer.offsetHeight / scrollContentWrapper.scrollHeight;
        return visibleRatio * scrollContainer.offsetHeight;
    }
    
    function moveScroller(evt) {
        // Move Scroll bar to top offset
        var scrollPercentage = evt.target.scrollTop / scrollContentWrapper.scrollHeight;
        topPosition = scrollPercentage * (scrollContainer.offsetHeight - 5); // 5px arbitrary offset so scroll bar doesn't move too far beyond content wrapper bounding box
        scroller.style.top = topPosition + 'px';
    }
    
    function startDrag(evt) {
        normalizedPosition = evt.pageY;
        contentPosition = scrollContentWrapper.scrollTop;
        scrollerBeingDragged = true;
    }
    
    function stopDrag(evt) {
        scrollerBeingDragged = false;
    }
    
    function scrollBarScroll(evt) {
        if (scrollerBeingDragged === true) {
            var mouseDifferential = evt.pageY - normalizedPosition;
            var scrollEquivalent = mouseDifferential * (scrollContentWrapper.scrollHeight / scrollContainer.offsetHeight);
            scrollContentWrapper.scrollTop = contentPosition + scrollEquivalent;
        }
    }
    
    function createScroller() {
        // *Creates scroller element and appends to '.scrollable' div
        // create scroller element
        scroller = document.createElement("div");
        scroller.className = 'scroller';
    
        // determine how big scroller should be based on content
        scrollerHeight = calculateScrollerHeight();
    
        if (scrollerHeight / scrollContainer.offsetHeight < 1){
            // *If there is a need to have scroll bar based on content size
            scroller.style.height = scrollerHeight + 'px';
    
            // append scroller to scrollContainer div
            scrollContainer.appendChild(scroller);
    
            // show scroll path divot
            scrollContainer.className += ' showScroll';
    
            // attach related draggable listeners
            scroller.addEventListener('mousedown', startDrag);
            window.addEventListener('mouseup', stopDrag);
            window.addEventListener('mousemove', scrollBarScroll)
        }
    
    }
    
    createScroller();
    
    
    // *** Listeners ***
    scrollContentWrapper.addEventListener('scroll', moveScroller);
    }());