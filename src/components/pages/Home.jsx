import { useState, useEffect, useCallback } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import Header from "./Header";
import FilterBar from "./FilterBar";
import SearchBar from "./SearchBar";
import ExpiryModal from "./ExpiryModal";
import LogoutModal from "./LogoutModal";
import toast from 'react-hot-toast';
import { apiRequestHelper, ApiError } from "../../api";
import useAsync from "../functions/useAsync";
import { useAuthContext } from "../../context/useAuthContext";

const Home = () => {
  const { auth, setAuth } = useAuthContext();
  const token = auth.token;

  const [isAuthExpired, setIsAuthExpired] = useState(false);
  const [isWantToLogout, setIsWantToLogout] = useState(false);

  const [todos, setTodos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filterPrio, setFilterPrio] = useState("");
  const [filterCat, setFilterCat] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const { isLoading, isSlow, run } = useAsync();
   
  const buildFilterURL = useCallback(() => { // Memoised func with constant ref unless
    let url = `/api/todos`;
    const params = new URLSearchParams();

    if (filterCat !== "") params.append("category", filterCat);
    if (filterPrio !== "") params.append("priority", filterPrio);
    if (filterStatus !== "") params.append("completed", filterStatus);
    if (searchTerm !== "") params.append("search", searchTerm);
    
    if (params.toString()) {
      url += `/filter?${params.toString()}`;
    }
    return url;
  }, [ filterCat, filterPrio, filterStatus, searchTerm ]); // deps change here

    const fetchTodos = useCallback(async () => {
       // Memoised func
       if (isAuthExpired) return;
        try {
            const url = buildFilterURL();
            const data = await run(() => apiRequestHelper(url, { token }));
            setTodos(data);
        } catch (err) {
          if (err instanceof ApiError && err.status === 401) {
              setIsAuthExpired(true);
              toast.error("Your session has expired. Please log in again.");
          } else {
              toast.error("Failed to fetch todos");
          }
            console.error(err.message);
        }
    }, [buildFilterURL ,run, token, isAuthExpired]); // changes only when deps change

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            void fetchTodos();
        }, 0);

        return () => window.clearTimeout(timeoutId);
    }, [fetchTodos]);

    useEffect(() => {
        const interval = window.setInterval(() => {
            void fetchTodos();
        }, 20000);

        return () => window.clearInterval(interval);
    }, [fetchTodos]);

    const handleLogOut = () => { // for token expiration
      localStorage.clear();
      window.location.reload();
    }

    const onLogout = () => { // for logging out
      setAuth(null);
    }

  return (
    <>
      <div className="flex flex-col justify-start px-4 pb-4 m-0 overflow-hidden h-dvh min-w-dvw 
        bg-linear-to-br from-black via-purple-950 to-black">

          <Header setIsWantToLogout={setIsWantToLogout} />
            <SearchBar 
              searchterm={searchTerm} onSearchChange={setSearchTerm} 
              statusFilter={filterStatus} onStatusChange={setFilterStatus}/>
      
        <div className="flex items-center justify-center max-w-3xl gap-4 p-2 mx-auto">
          <FilterBar  filterPrio={filterPrio} setFilterPrio={setFilterPrio}
                      filterCat={filterCat} setFilterCat={setFilterCat}/>

          <button onClick={() => setShowForm(true)} 
                className='px-4 py-2 text-md transition-all duration-700 bg-green-400 
                rounded-md cursor-pointer flex-2 w-fit text-white/80
                hover:scale-105 active:bg-gray-700'>
                  Add Task
          </button>
        </div>
        
          <TaskList flags={{ isLoading, isSlow }} todos={todos} setTodos={setTodos} />
            { showForm && (<TaskForm setTodos={setTodos} setShowForm={setShowForm} />) }
              { isAuthExpired && (<ExpiryModal onclick={handleLogOut} />) }
                { isWantToLogout && (<LogoutModal isWantToLogout={setIsWantToLogout} onLogout={onLogout}/>) }
      </div>
    </>
  )
}
export default Home;