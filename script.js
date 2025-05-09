const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

let editTodo = null;

//Function to Add To do
const addTodo = () => {
    const inputText = inputBox.value.trim();
    
    if(inputText.length <= 0) {
        alert("Write Something in Todo")
    }
    else if(addBtn.value == "Edit") {
        editLocalTodos(editTodo.target.previousElementSibling.innerHTML);
        editTodo.target.previousElementSibling.innerHTML = inputText;
        addBtn.value = "Add";
        inputBox.value = "";
        inputBox.focus();
    }
    else {
        const li = document.createElement("li");
        const p = document.createElement("p");

        p.innerHTML = inputText;
        li.appendChild(p);

        //Create Edit Button
        const editBtn = document.createElement("button");
        editBtn.innerHTML = "Edit";
        editBtn.classList.add("btn", "editBtn");
        li.appendChild(editBtn);

        //Create Delete Button
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Remove";
        deleteBtn.classList.add("btn", "deleteBtn");
        li.appendChild(deleteBtn); 

        todoList.appendChild(li);
        inputBox.value = "";

        saveLocalTodos(inputText);
    }
}

//Function to Update To do (Update + Delete)
const updateTodo = (e) => {
    //Remove Button Functionality
    if(e.target.innerHTML == "Remove"){
        todoList.removeChild(e.target.parentElement);
        deleteLocalTodos(e.target.parentElement);
    }

    //Edit Functionality
    else if(e.target.innerHTML == "Edit"){
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBtn.value = "Edit";
        editTodo = e;
    }
}

//Save Local Todos
const saveLocalTodos = (todo) => {
    let todos = [];

    if(localStorage.getItem("todos") == null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

//Get Local Todos
const getLocalTodos = () => {
    let todos = [];

    if(localStorage.getItem("todos") == null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
        todos = Array.from(todos);
        todos.forEach(todo => {
            
            const li = document.createElement("li");
            const p = document.createElement("p");

            p.innerHTML = todo;
            li.appendChild(p);

            //Create Edit Button
            const editBtn = document.createElement("button");
            editBtn.innerHTML = "Edit";
            editBtn.classList.add("btn", "editBtn");
            li.appendChild(editBtn);

            //Create Delete Button
            const deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = "Remove";
            deleteBtn.classList.add("btn", "deleteBtn");
            li.appendChild(deleteBtn); 

            todoList.appendChild(li);
        })
    }
}

//Delete Local Todos
const deleteLocalTodos = (todo) => {
    let todos = [];

    if(localStorage.getItem("todos") == null) {
        todos = [];
    }
    else {
        todos = Array.from(JSON.parse(localStorage.getItem("todos")));
    }

    let todoText = todo.children[0].innerHTML;
    let todoIndex = todos.indexOf(todoText);
    //slice(copy)/splice(original)
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));

    console.log(todoIndex);
}

//Edit Local Todos
const editLocalTodos = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoIndex = todos.indexOf(todo);
    todos[todoIndex] = inputBox.value;
    localStorage.setItem("todos", JSON.stringify(todos));
}


addBtn.addEventListener('click', addTodo);
inputBox.addEventListener('keydown', function(event) {
    if (event.key == 'Enter') addTodo();
});

todoList.addEventListener('click', updateTodo);

window.onload = () => {
    inputBox.focus();
    getLocalTodos();
};



