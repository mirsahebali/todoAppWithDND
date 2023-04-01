import {FaRegTrashAlt} from 'react-icons/fa'
export default function Todo({todo, text,  completed, toggleComplete, deleteTodo, prop1, prop2, inRef}:any) {
const styles:any = {
li: `flex items-center justify-between bg-slate-100 rounded-lg shadow-sm p-2 my-2`,
liComplete: `flex items-center justify-between bg-slate-100 rounded-lg shadow-sm p-2 my-2 line-through  cursor-pointer`,
row: `flex `,
text: `text-slate-900 cursor-pointer font-bold ml-2`,
textComplete: `text-slate-900 cursor-pointer font-bold ml-2 line-through`,
button: `bg-red-500 hover:bg-red-900 duration-300 text-white rounded-lg p-2`,
}
return <li {...prop1} {...prop2} ref={inRef} className={completed? styles.liComplete: styles.li}>
<div className={styles.row}>
          <input onChange={()=> toggleComplete(todo)} type="checkbox" placeholder="todo" checked={completed ? true: false}/>
          <p onClick={()=> toggleComplete(todo)} className={completed? styles.textComplete:  styles.text}>{text}</p>
</div>
<button className={styles.button} onClick={()=> deleteTodo(todo)}>{<FaRegTrashAlt/>}</button>
</li>
}