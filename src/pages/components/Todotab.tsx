import { AiOutlinePlus } from 'react-icons/ai'
import { useState, useEffect } from 'react'
import Todo from './Todo'
import {  addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc } from 'firebase/firestore'
import {db} from '../../firebase'
import {DragDropContext , Draggable, Droppable, } from 'react-beautiful-dnd'
const  styles:any = {
bg: `h-screen p-4 w-screen bg-gradient-to-r from-blue-400 to-blue-500`,
container: `bg-slate-100 rounded-lg shadow-xl p-4 max-w-md mx-auto`,
heading: `text-2xl  font-bold text-center text-slate-900`,
form: `flex items-center justify-center`,
input: `border-2 text-xl border-slate-200 rounded-lg p-2 w-full mr-2 focus:outline-none focus:border-slate-500`,
button: `bg-blue-500 hover:bg-blue-900 duration-300 text-white rounded-lg p-2`,
li: `flex items-center justify-between bg-slate-100 rounded-lg shadow-sm p-2 my-2`,
row: `flex items-center justify-between w-full`,
text: `text-slate-900`,
count: `text-slate-900 text-center mt-4`,
}
export default function TodoTab(){ 
const [todos, setTodos] = useState([])

const [input, setInput] = useState('')
const [order, setOrder] = useState(todos)
//handle drag and drop
function handleOnDragEnd(result:any) {
  if (!result.destination) return;
  const items = Array.from(todos)
  const [reorderedItem] = items.splice(result.source.index, 1)
  items.splice(result.destination.index, 0, reorderedItem)
  setTodos(items)
}

//create todo to firebase
async function createItem(e:any) {
  e.preventDefault()
if (input === "") {
  alert("Please enter a todo");
  return
}else{
  await addDoc(collection(db, "todos"), {
    text: input,
    completed: false
  })
  setInput('')
}
}

//read todo to firebase

useEffect(() => {
const q = query(collection(db, "todos"))
const unsubscribe:any = onSnapshot(q, (querySnapshot: any) => {
  let todosArray:any = []
  querySnapshot.forEach((doc:any) => {
todosArray.push({...doc.data(), id: doc.id})
})
setTodos(todosArray)
})
return ()=> unsubscribe()
}, [])
//update todo to firebase
async function toggleComplete( todo:any) {
  await updateDoc(doc(db, "todos", todo.id), {
    completed: !todo.completed
  })
}


//delete todo to firebase
async function deleteItem(todo:any) {
  await deleteDoc(doc(db, "todos", todo.id))
}


return <>

<div className={styles.bg}>
  <div className={styles.container}>
<h3 className={styles.heading}>
  Todo App with Drag and Drop
</h3>
<form onSubmit={createItem } action="/" className={styles.form}>
  <input value={input} onChange={e => setInput(e.target.value)} type='text' placeholder='Add a todo' className={styles.input} />
  <button  className={styles.button} type='submit'><AiOutlinePlus size={30}/>{" "}</button>
</form>
<DragDropContext onDragEnd={handleOnDragEnd}>
  <Droppable droppableId='Tasks'>
    {(provided:any)=> (
<ul {...provided.droppableProps} ref={provided.innerRef}>
  {todos.map((todo:any, index) => {
  return <Draggable key={todo.id} index={index} draggableId={todo.id} >
    {(provided:any)=> (
  <Todo prop1={provided.draggableProps} prop2={provided.dragHandleProps} inRef={provided.innerRef}  todo={todo} text={todo.text} completed={todo.completed} toggleComplete={toggleComplete} deleteTodo={deleteItem}/>

      )}
  </Draggable>})}
</ul>
)}
</Droppable>
</DragDropContext>
{todos.length < 1? null: <p className={styles.count}>You have {todos.length} todos</p>}
  </div>
</div>
</>
     
    }