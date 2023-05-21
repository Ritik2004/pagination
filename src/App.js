import { useEffect,useState } from "react";
import axios from 'axios'
import "./index.css"
const url = "http://jsonplaceholder.typicode.com/todos"

function App() {
  //This state we are taking to pass the number of list we want to take
  const[todos,setTodo] = useState([])

  //This state is uded to get nos od todos we want in a page
  const[todosPerPage, setTodosPerPage] = useState(10)
  const[currentPage, setCurrentPage] = useState(1);
 
  useEffect(()=>{
    axios.get(url)
    .then((res)=>setTodo(res.data))
    },[])

  const numOfTotalPages = Math.ceil(todos.length/todosPerPage) //this is nos of page

  //here we are creating array of total num of pages
  const pages = Array.from(Array(numOfTotalPages+1).keys()).slice(1) //Array.from convert to array
  
  //here we are getting index of first and last todo we want to show in a page
  const indexOfLastTodo = currentPage*todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo-todosPerPage

  const visibleTodo = todos.slice(indexOfFirstTodo,indexOfLastTodo+1)

  function prevPageHandle(){
    if(currentPage!==1) setCurrentPage(currentPage-1)
  }
 
  function nextPageHandle(){
    if(currentPage!==numOfTotalPages) setCurrentPage(currentPage+1)
  }

  return (
    <>
    <select onChange={(e)=>setTodosPerPage(e.target.value)}>
     <option value="10">10</option>
     <option value="20">20</option>
     <option value="30">30</option>
    </select>
    <div className="App">
     {
      visibleTodo.map((todo)=>
         <p key={todo.id}>{todo.title}</p>
      )
     }
     <span onClick={prevPageHandle}>
     Prev
     </span>
     <p>{pages.map((page)=><span 
     key={page} 
     onClick={()=>setCurrentPage(page)}
     className={`${currentPage === page ? "active" : ""}`}
     >{`${page} |`}</span>)}</p>
     <span onClick={nextPageHandle}>
     Next
     </span>
    </div>
    </>
  );
}

export default App;
