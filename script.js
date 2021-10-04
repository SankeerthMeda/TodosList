//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption=document.querySelector('.filter-todo');
//Event Listener
todoButton.addEventListener('click', addTodo => {
    addTodo.preventDefault();
    // console.log('hello');
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    const newTodo = document.createElement('li');
    // newTodo.innerHTML = "yera pooka";
    newTodo.innerHTML=todoInput.value;
    // newTodo.style.fontWeight='bold';
    newTodo.style.fontSize='23px';
    newTodo.style.fontFamily="'Times New Roman', Times, serif";
    newTodo.classList.add('todo-item');
    todoDiv.append(newTodo);
    //local storage
    saveLocalTodos(todoInput.value); 
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add('complete-btn');
    todoDiv.append(completeButton);
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.append(trashButton);
    todoList.appendChild(todoDiv);
    //clear todo input
    todoInput.value="";
});
todoList.addEventListener('click',deleteCheck);
function deleteCheck(e) {
    console.log(e.target);
    const item=e.target;
    if(item.classList[0]==="trash-btn"){
        // item.remove();
        par=item.parentElement;
        par.classList.add('fall');
        removeLocalTodos(par);
        par.addEventListener('transitionend',e=>{
            par.remove();
        })
        // par.remove();
    }
    if(item.classList[0]==='complete-btn'){
         todo=item.parentElement;
        todo.classList.toggle("completed");
    }
}
filterOption.addEventListener('click',filterTodo);
function filterTodo(e) {
    const todos=todoList.childNodes;
    console.log(todos);
    todos.forEach(function(todoo) {
       switch (e.target.value) {
           case "all":
               todoo.style.display="flex";
               break;
            case "completed":
                if(todoo.classList.contains('completed')){
                    todoo.style.display='flex';
                }
                else{
                    todoo.style.display='none';
                }
                break;
            case "incomplete":
                if(!todoo.classList.contains('completed')){
                    todoo.style.display='flex';
                }
                else{
                    todoo.style.display='none';
                }
                break;
           default:
               break;
       } 
    });
}
function saveLocalTodos(todo) {
    //check
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}
function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    } 
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    // console.log(todo.children[0].innerText);
    const todoIndex=todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem('todos',JSON.stringify(todos));
}