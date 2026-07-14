import { useState, useEffect, useCallback } from "react";
import Taskform from "./TaskForm";
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

    const fetchTodos = useCallback(async () => { // Memoised func
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
    }, [buildFilterURL ,run, token]); // changes only when deps change

    useEffect(() => { 
        const timeoutId = window.setTimeout(() => {
            void fetchTodos(); // this kept throwing lint complaints
        }, 0);          // I changed it to run through a tiny deferred timeout, 
                  // which keeps the behavior similar but avoids the lint complaint.

        return () => window.clearTimeout(timeoutId);
    }, [fetchTodos]);

    //INFO: the effect will rerun whenever fetchTodos changes. 
    //INFO: And fetchTodos changes only when its own dependencies change, 
    //INFO: which include buildFilterURL, token, and run. 
    //INFO: Since buildFilterURL changes when the filters change, 
    //INFO: the effect will rerun when the filters change too.

    //INFO: polling function - fetch data from server at regular intervals to sync
    useEffect(() => {  
      const interval = setInterval(() => {
          void fetchTodos();
        }, 10000);

        return () => clearInterval(interval);
    }, [fetchTodos]); 

    //INFO:  deps are always something that the effect reads
    //INFO: the effect depends on the memoized function(fetchTodos)
    //INFO: that function depends on another memoized function(buildURL)
    //INFO: and that function dependsd on filters
    //INFO: therefore THIS effect effectively depends on the filters indirectly

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
                className='px-4 py-2 text-lg transition-all duration-700 bg-green-400 
                rounded-md cursor-pointer flex-2 w-fit text-white/80 backdrop-blur-2xl border-white/20 
                hover:scale-105 active:bg-gray-700'>
                  Add Task
          </button>
        </div>
        
          <TaskList flags={{ isLoading, isSlow }} todos={todos} setTodos={setTodos} />
            { showForm && (<Taskform setTodos={setTodos} setShowForm={setShowForm} />) }
              { isAuthExpired && (<ExpiryModal onclick={handleLogOut} />) }
                { isWantToLogout && (<LogoutModal isWantToLogout={setIsWantToLogout} onLogout={onLogout}/>) }
      </div>
    </>
  )
}
export default Home;