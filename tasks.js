const API_URL = "http://localhost:5000/api";

const token =
localStorage.getItem("token");

if(!token){
    window.location="login.html";
}

async function createTask(){

    const title =
    document.getElementById("title").value;

    const description =
    document.getElementById("description").value;

    const status =
    document.getElementById("status").value;

    await fetch(
        `${API_URL}/tasks`,
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":token
            },
            body:JSON.stringify({
                title,
                description,
                status
            })
        }
    );

    loadTasks();
}

async function loadTasks(){

    const response =
    await fetch(
        `${API_URL}/tasks`,
        {
            headers:{
                "Authorization":token
            }
        }
    );

    const tasks =
    await response.json();

    let output = "";

    tasks.forEach(task => {

        output += `
        <div class="card task-card p-3">

        <h5>${task.title}</h5>

        <p>${task.description}</p>

        <span class="badge bg-primary">
        ${task.status}
        </span>

        <br><br>

        <button
        class="btn btn-danger"
        onclick="deleteTask(${task.id})">

        Delete

        </button>

        </div>
        `;
    });

    document.getElementById("tasks")
    .innerHTML = output;
}

async function deleteTask(id){

    await fetch(
        `${API_URL}/tasks/${id}`,
        {
            method:"DELETE",
            headers:{
                "Authorization":token
            }
        }
    );

    loadTasks();
}

loadTasks();