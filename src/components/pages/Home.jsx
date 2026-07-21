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
    <div className="flex flex-col justify-start p-4 m-0 h-dvh min-w-dvw overflow-auto
        bg-linear-to-br from-background via-background-secondary to-background-tertiary
        ">
      <div className="space-y-2">
          <Header setIsWantToLogout={setIsWantToLogout} />
            <SearchBar 
              searchterm={searchTerm} onSearchChange={setSearchTerm} 
              statusFilter={filterStatus} onStatusChange={setFilterStatus}/>
      
        <div className="flex items-center justify-center gap-2 mb-4 w-2xs mx-auto md:max-w-2xl md:mb-8">
          <FilterBar  filterPrio={filterPrio} setFilterPrio={setFilterPrio}
                      filterCat={filterCat} setFilterCat={setFilterCat}/>

          <button onClick={() => setShowForm(true)} 
                className='px-2 py-1 text-md bg-primary hover:bg-primary-hover active:bg-primary-active
                rounded-sm cursor-pointer w-fit text-text
                hover:scale-105 md:py-2 md:px-4 transition-all duration-normal'>
                  Add Task
          </button>
        </div>
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