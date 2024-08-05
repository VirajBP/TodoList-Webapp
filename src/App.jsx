import { useState, useEffect } from 'react'
import Navbar from './Components/Navbar'
import { v4 as uuidv4 } from 'uuid';
// ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

function App() {
  const [count, setCount] = useState(0)
  const [todo, settodo] = useState("")  //this todo is the general todo text
  const [todos, setTodos] = useState([])  //this is the array which stores all the todos

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todo = JSON.parse(localStorage.getItem("todos"))
      setTodos(todo)
    }
  }, [])


  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }


  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")
    saveToLS()
  }

  const handleChange = (e) => {
    settodo(e.target.value)
  }
  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    console.log(newTodos);
    saveToLS()
  }


  return (
    <>
      <Navbar />
      <div className="bg-orange-400 container my-2 w-full md:w-3/5 m-auto ">
        <div className="addTodo ">
          <h1 className='font-bold text-center text-3xl italic'>Add Your Todos</h1>
          <div className='flex-col items-center md:flex-row sm:flex-wrap flex justify-center gap-10 my-5 '>
            <input onChange={handleChange} value={todo} type="text" className='h-8 bg-orange-200 md:w-3/5 w-4/5 rounded-lg' />
            <button onClick={handleAdd} disabled={todo.length < 3} className='bg-orange-700 w-2/5 md:w-1/5 h-8 rounded-lg text-white cursor-pointer hover:bg-orange-800 '>Save</button>
          </div>

        </div>
        <div className=" w-full mx-auto rounded-xl px-3">
          <h1 className='font-bold text-2xl'>Your Todos</h1>
          {todos.length === 0 && <div>No todos to display</div>}
          {todos.map(item => {
            return <div>
              <div key={item.id} className="todoList flex my-2 justify-between">
                <div className='flex gap-10'>
                  <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
                  <span className={item.isCompleted ? "line-through" : ""}>{item.todo}</span>
                </div>
                <div className="buttons flex gap-3">
                  <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-orange-700 w-11 rounded-lg text-white h-full hover:bg-orange-800 flex justify-center'><span class="material-symbols-outlined">
                    edit
                  </span></button>
                  <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-orange-700 w-16 rounded-lg text-white h-full hover:bg-orange-800 flex justify-center'><span class="material-symbols-outlined">
                    delete
                  </span></button>
                </div>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
