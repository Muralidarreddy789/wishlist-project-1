const input=document.querySelector('input');
const button=document.querySelector('.button');
const displayWish=document.querySelector('.display-wish');
let todo;

let localdata=JSON.parse(localStorage.getItem("todo"))
let todolist=localdata || [];

render(todolist)

function random()
{
    return Math.floor((Math.random()*1000000)+1).toString();
}
button.addEventListener('click',(event)=>{
    event.preventDefault()
    todo=input.value;
    if(todo.length>0)
    {
        todolist.push({id:random(),todo,isChecked:false});
    }
    render(todolist);
    localStorage.setItem("todo",JSON.stringify(todolist));
    input.value='';
})

displayWish.addEventListener('click',(e)=>
{
    const key=e.target.dataset.key;
    const delKey=e.target.dataset.delitem;
    todolist=todolist.map((todo)=>todo.id===key?{...todo,isChecked:!todo.isChecked}:todo);
    todolist=todolist.filter((todo)=>todo.id!==delKey);
    localStorage.setItem("todo",JSON.stringify(todolist));
    render(todolist);
})

function render(todolist)
{
    displayWish.innerHTML=todolist.map((todo)=>{
     return   `
            <div>
                <input type="checkbox" id=${todo.id} class="check"  data-key=${todo.id} ${todo.isChecked?"checked":""}>
                <label for=${todo.id} data-key=${todo.id} class=${todo.isChecked?"over":""}>${todo.todo}</label>
                <button class="size"><span class="material-symbols-outlined" data-delitem=${todo.id}>
                delete
                </span></button>
            </div>
        `
});

}