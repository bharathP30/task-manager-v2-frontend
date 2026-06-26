import { useState } from "react";
import toast from "react-hot-toast";

export default function Taskform({ fetchTodos, setTodos, setShowForm, api, token }) {
    const [task, setTask] = useState({
        oId: crypto.randomUUID(), // temporary id until we get the real id from the server; helps with optimistic UI update
        taskContent: "",
        category: "",
        priority: "",
        dueDate: "",
        completed: false,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (task.taskContent.trim().length === 0) return;

        const optimisticTodo = { ...task };
        setTodos((prev) => [optimisticTodo, ...prev]); // Optimistically update the UI

        try {
            const res = await fetch(`${api}/api/todos`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(task),
            });

            const data = await res.json();

            if (!res.ok) {
                // Remove optimistic todo on error
                //fetchTodos(); // you can refetch the todos to get the correct state from the server
                
                // Alternatively, you can just remove this optimistic todo from the state instead of refetching everythig
                setTodos((prev) => prev.filter(t => t.oId !== task.oId));
                toast.error("Failed to create todo, Server-side error has occured while creating");
                return;
            }

             // Replace temp todo with real one from server, instead of refetching all todos
            setTodos((prev) => prev.map(t => 
                t.oId === task.oId ? data : t
            ));

            toast.success("Todo created successfully!");
            
            // INFO: fetchTodos(); 
            // // No need to refetch since we already have the new todo from the response
            /* 
            Instead of two fetchTodos() calls (which would be 2 GET requests to refetch all todos)
            I am using two local setTodos() updates 
            - one to optimistically add the new todo, 
            and another to replace it with the real data from the server once we get the response. 
            This way we avoid an extra GET request and make the UI feel more responsive.
            */


            // reset the form
            setTask({
                oId: crypto.randomUUID(), // renew the temporary ID for the next task
                taskContent: "",
                category: "",
                priority: "",
                dueDate: "",
                completed: false,
            });

            setShowForm(false);
            
        } catch (error) {
            console.error(error);
            toast.error("Server-side error while submitting todo");
            fetchTodos();  
        }

    };

    const optionStyles = "font-mono bg-black/90 text-white/80" ;

    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">

        <form onSubmit={handleSubmit} className='w-full p-4 font-sans text-center text-white border rounded-lg bg-linear-to-b from-black/50 to-black/40 border-white/20 backdrop-blur-lg md:max-w-3xl md:p-8 md:text-lg'>

            <input required
                className='w-full p-2 m-2 mx-auto font-sans text-gray-100 bg-transparent border rounded-sm outline-none border-white/10 backdrop-blur-md focus:ring-1 ring-white/10 placeholder-white/40'
                onChange={(e) => setTask({ ...task, taskContent: e.target.value })}
                type="text"
                id="taskInput"
                value={task.taskContent}
                placeholder='Enter Task...' />


            <div className='grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4'>

                <select
                    className='h-10 font-sans text-center text-white rounded-sm outline-none cursor-pointer bg-white/10 border border-white/10'
                    onChange={(e) => setTask({ ...task, category: e.target.value })}
                    name="categoryType"
                    id="categoryType"
                    value={task.category}
                >
                    <option className={optionStyles} value="" disabled>Category</option>
                    <option className={optionStyles} value="personal">Personal</option>
                    <option className={optionStyles} value="school">School</option>
                    <option className={optionStyles} value="work">Work</option>
                    <option className={optionStyles} value="shopping">Shopping</option>
                    <option className={optionStyles} value="others">Others</option>

                </select>

                <select
                    className='h-10 font-sans text-center text-white rounded-sm outline-none cursor-pointer bg-white/10 border border-white/10'
                    onChange={(e) => setTask({ ...task, priority: e.target.value })}
                    name="priorityType"
                    id="priorityType"
                    value={task.priority}
                >
                    <option className={optionStyles} value="" disabled>Priority</option>
                    <option className={optionStyles} value="high">High</option>
                    <option className={optionStyles} value="medium">Medium</option>
                    <option className={optionStyles} value="low">Low</option>

                </select>

                <input required
                    className='h-10 px-4 font-sans text-center text-white rounded-sm outline-none cursor-text bg-white/10 border border-white/10'
                    onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
                    type="date"
                    id="deadDate"
                    value={task.dueDate}
                />

            </div>
              <div className="flex items-end justify-center gap-2 md:justify-center md:gap-4">
                <button
                type="reset"
                onClick={() => setShowForm(false)}
                className={`text-md w-1/3 mt-4 text-center p-2 rounded-md  flex-1 
                            transition-all duration-200 md:mt-8
                        bg-gray-500 cursor-not-allowed text-gray-700`
                        }
            >
                Cancel
            </button>
            <button
                type="submit"
                disabled={task.taskContent.trim().length === 0}
                className={`text-white text-md w-1/3 mt-4 text-center p-2 rounded-md flex-1 
                            transition-all duration-200 md:mt-8
                                 ${task.taskContent.trim().length === 0
                        ? 'bg-gray-500 cursor-not-allowed text-gray-700'
                        : 'bg-green-500 active:scale-105 active:bg-green-600 cursor-pointer'}`}
            >
                Add Task
            </button>
              </div>
        </form>
    </div>
    )
}