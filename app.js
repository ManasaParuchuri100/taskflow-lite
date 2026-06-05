const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const taskCount = document.getElementById("task-count");

let tasks =
JSON.parse(
    localStorage.getItem("tasks")
) || [];

renderTasks();

function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

form.addEventListener("submit", function(e){

    e.preventDefault();

    const taskText = input.value.trim();

    if(taskText === ""){
        alert("Please enter a task");
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);

    saveTasks();

    renderTasks();

    input.value = "";
});

function renderTasks(){

    taskList.innerHTML = "";

    tasks.forEach(task => {

        const li = document.createElement("li");

        li.innerHTML = `
            <input
                type="checkbox"
                ${task.completed ? "checked" : ""}
                data-id="${task.id}"
            >

            <span class="${
                task.completed ? "completed" : ""
            }">
                ${task.text}
            </span>

            <button
                class="delete-btn"
                data-id="${task.id}"
            >
                ❌
            </button>
        `;

        taskList.appendChild(li);
    });

    taskCount.textContent = tasks.length;
}

taskList.addEventListener("change", function(e){

    if(e.target.type === "checkbox"){

        const id = Number(e.target.dataset.id);

        const task = tasks.find(
            task => task.id === id
        );

        task.completed = e.target.checked;

        renderTasks();
    }
});

taskList.addEventListener("click", function(e){

    if(e.target.classList.contains("delete-btn")){

        const id = Number(e.target.dataset.id);

        tasks = tasks.filter(
            task => task.id !== id
        );

        renderTasks();
    }
});