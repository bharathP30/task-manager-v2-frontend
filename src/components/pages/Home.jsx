import { useState, useEffect } from "react";
import Taskform from "./TaskForm";
import TaskList from "./TaskList";
import Header from "./Header";
import FilterBar from "./FilterBar";
import SearchBar from "./SearchBar";
import ExpiryModal from "./ExpiryModal";
import LogoutModal from "./LogoutModal";

const home = ({ api, token, setAuth }) => {
  const [isAuthExpired, setIsAuthExpired] = useState(false);
  const [isWantToLogout, setIsWantToLogout] = useState(false);

  const [todos, setTodos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filterPrio, setFilterPrio] = useState("");
  const [filterCat, setFilterCat] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const buildFilterURL = () => {
    let url = `${api}/api/todos`;
    const params = new URLSearchParams();

    console.log("filters are, ", filterCat, filterPrio, filterStatus, searchTerm);
    
    if (filterCat !== "") params.append("category", filterCat);
    if (filterPrio !== "") params.append("priority", filterPrio);
    if (filterStatus !== "") params.append("completed", filterStatus);
    if (searchTerm !== "") params.append("search", searchTerm);
    
    
    if (params.toString()) {
      url += `/filter?${params.toString()}`;
    }
    console.log("URl is, ", url);
    return url;
  };

    const fetchTodos = async () => {
        try {
            const url = buildFilterURL();
            const res = await fetch(url, {
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${token}`,
                },
            })
            const data = await res.json();

            if (res.status === 401) {
              setIsAuthExpired(true);
              return console.error(data.error);

            }
            
            console.log("fetched todos are, ", data);
            setTodos([...data]);

        } catch (err) {
            console.log(err);
            console.error("error has occured while fetching");
        }
    }

    useEffect(() => {
        fetchTodos();
    }, [ filterCat, filterPrio, filterStatus, searchTerm ]);

    const handleLogOut = () => {
      localStorage.clear();
      window.location.reload();
    }

    const onLogout = () => {
      setAuth(null);
    }

  return (
    <>
      <div className="flex flex-col justify-start px-4 pb-4 m-0 overflow-hidden h-dvh min-w-dvw bg-linear-to-br from-black via-purple-950 to-black">
        <Header isWantToLogout={setIsWantToLogout} />
        <SearchBar searchterm={searchTerm} onSearchChange={setSearchTerm} statusFilter={filterStatus} onStatusChange={setFilterStatus}/>
      
        <div className="flex items-center justify-center max-w-3xl gap-4 p-2 mx-auto">
          <FilterBar filterPrio={filterPrio} setFilterPrio={setFilterPrio} filterCat={filterCat} setFilterCat={setFilterCat}/>
          <button onClick={() => setShowForm(true)} className='px-4 py-2 text-lg transition-all duration-700 bg-green-400 rounded-md cursor-pointer flex-2 w-fit text-white/80 backdrop-blur-2xl border-white/20 hover:scale-105 active:bg-gray-700'>
            Add Task</button>
        </div>
        
        <TaskList todos={todos} setTodos={setTodos} fetchTodos={fetchTodos} api={api} token={token}  />
        
        { showForm && (<Taskform fetchTodos={fetchTodos} setTodos={setTodos} setShowForm={setShowForm} api={api} token={token} />)
        }

        {
          isAuthExpired && (<ExpiryModal onclick={handleLogOut} />)
        }
        {
          isWantToLogout && (<LogoutModal isWantToLogout={setIsWantToLogout} onLogout={onLogout}/>)
        }
      </div>
    </>
  )
}

export default home
