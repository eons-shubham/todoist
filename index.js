let timeEle = document.getElementById("currentTime");
let curTime = new Date().toLocaleDateString("en-us", { weekday: "long", year: "numeric", month:"short", day: "numeric" });

timeEle.innerText = curTime;

let taskArray = [];

let submitBtn = document.getElementById("button-submit");

submitBtn.addEventListener("click", (e) => {
    let inputTask = document.getElementById("input-box");
    let inputTaskValue = inputTask.value;
    if(inputTaskValue){
        taskCreate(inputTaskValue);
        inputTask.focus();
        inputTask.value = "";
    }

})

document.getElementById("input-box").addEventListener("keypress", (event)=>{
    if(event.key === "Enter"){
        let inputTask = document.getElementById("input-box");
        let inputTaskValue = inputTask.value;
        if(inputTaskValue){
            taskCreate(inputTaskValue);
            inputTask.focus();
            inputTask.value = "";
        }
    }
})

function localStorageTask(value){
    taskArray = JSON.parse(localStorage.getItem("taskArray"));
    if(taskArray === null){
        localStorage.setItem("taskArray", JSON.stringify([]));
        taskArray = JSON.parse(localStorage.getItem("taskArray"));
    }

    let obj = {
        name: value,
        done: 0
    };

    taskArray.push(obj);
    localStorage.setItem("taskArray", JSON.stringify(taskArray));
}

function taskCreate(value){
    const newDiv = document.createElement("li");
    newDiv.className = "list-group-item";

    const parent = document.getElementById("data");

    const id = parent.children.length;
    // taskArray.push(0); // done
    localStorageTask(value);

    newDiv.innerHTML = `
        <input class="form-check-input me-1" name="accept" type="checkbox" id=${id}>
        <label class = "child" for="accept"> ${value} </label>
    `
    parent.appendChild(newDiv);


}

function updateLocalStorage(index){
    localStorage.setItem("taskArray", JSON.stringify(taskArray));
}

document.getElementById("data").addEventListener("change", (e) => {

    let targetId = e.target.id;
    const modify = document.querySelectorAll(".list-group-item");
    const modifyChild = modify[e.target.id].querySelector(".child");
    const value = modifyChild.innerText;
    
    
    if(taskArray[targetId].done === 0){
        taskArray[targetId].done = 1;
        updateLocalStorage(e.target.id);
        modifyChild.innerHTML =  `
            <label class = "child" for="accept"> <strike>${value}</strike> </label>
        `
    }
    else{
        taskArray[targetId].done = 0;
        updateLocalStorage(e.target.id);
        modifyChild.innerHTML =  `
            <label class = "child" for="accept"> ${value} </label>
        `
    }
    console.log(taskArray);

})

document.getElementById("clearAll").addEventListener("click", (e)=>{
    document.getElementById("data").innerHTML = "";
    localStorage.setItem("taskArray", JSON.stringify([]));
})


addEventListener("DOMContentLoaded", () => {
    taskArray = JSON.parse(localStorage.getItem("taskArray"));
    const parent = document.getElementById("data");
    
    taskArray.forEach((e, i, a) => {
        if(e.done === 0){
            const newDiv = document.createElement("li");
            newDiv.className = "list-group-item";
            const id = parent.children.length;
            newDiv.innerHTML = `
                <input class="form-check-input me-1" name="accept" type="checkbox" id=${i}>
                <label class = "child" for="accept"> ${e.name} </label>
            `
            parent.appendChild(newDiv);
        }
        else{
            const newDiv = document.createElement("li");
            newDiv.className = "list-group-item";
            const id = parent.children.length;
            newDiv.innerHTML = `
                <input class="form-check-input me-1" name="accept" type="checkbox" checked="true" id=${i}>
                <label class = "child" for="accept"> <strike>${e.name}</strike> </label>
            `
            parent.appendChild(newDiv);
        }
    });


})
