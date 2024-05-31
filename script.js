

let todoList = [];
let todoInput = document.getElementById('todoInput');
let todoListContainer = document.getElementById('todoList');
let isEditing = false;
let currentEditIndex = -1;


let addToDo = () => {
    let newTodo = todoInput.value.trim();
    if (newTodo && !isEditing) {
        todoList.push(newTodo);
        todoInput.value = "";
        renderToDoList();
        console.log(`Added: ${newTodo}\n`, todoList);
    } else if (isEditing) {
        saveEdit();
    }
};


let renderToDoList = () => {
    todoListContainer.innerHTML = todoList.map((todo, index) => `
        <div class="todo-item">
            ${todo}
            <button class="deleteButton btn btn-delete btn1" onclick="deleteToDo(${index})">
            <i class="fas fa-trash-alt btn1"></i>
             <span class="tooltip">Delete</span>
            </button>

            <button class="editBtn btn btn-edit btn2 ${isEditing && currentEditIndex === index ? 'hidden' : ''}" onclick="editToDo(${index})">
             <i class="fas fa-edit btn2"></i>
            </button>

            <button class="btn btn-save btn3 ${isEditing && currentEditIndex === index ? '' : 'hidden'}" onclick="saveEdit()">
            <i class="fas fa-save btn3"></i>
            </button>

        </div>
    `).join('');
};



let deleteToDo = (index) => {
    todoList.splice(index, 1);
    renderToDoList();
};


let editToDo = (index) => {
    todoInput.value = todoList[index];
    isEditing = true;
    currentEditIndex = index;
    renderToDoList();
};


let saveEdit = () => {
    let editedTodo = todoInput.value.trim();
    if (editedTodo) {
        todoList[currentEditIndex] = editedTodo;
        todoInput.value = "";
        isEditing = false;
        currentEditIndex = -1;
        renderToDoList();
    }
};


let errorToDo = (index) => {
    if (isEditing) {
        todoInput.value = todoList[index];
        isEditing = true;
        currentEditIndex = index;
        renderToDoList();
    } else {
        console.error("Please Save.");
    }
};

todoInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        addToDo();
    }
});

