import { useState } from "react";
import toast from "react-hot-toast";
import { apiRequestHelper } from "../../api";
import { useAuthContext } from "../../context/useAuthContext";

// there probably is no need to use the useAsync function here for the CRUD features, since by the time that the user
// makes these requests, the server probably is already guanranteed to be be warm and running
// login, signup and initial fetchtodos() is not, there are almost always guanranteed to be the first request made by the
// user, and since Render free tier goes cold after each 15 min, user might see nothing here, that is why useAsync feedback is needed

export default function TaskForm({ setTodos, setShowForm }) {
    const { auth : { token }} = useAuthContext();
    const [isTextareaFocused, setIsTextareaFocused] = useState(false);
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

        if (task.taskContent.trim().length === 0) return toast.error("Please, enter task content");

        const optimisticTodo = { ...task };
        setTodos((prev) => [optimisticTodo, ...prev]); // Optimistically update the UI

        try {
            const data = await apiRequestHelper(`/api/todos`, {method: "POST", token, body: task });
            setTodos((prev) => prev.map(t => t.oId === task.oId ? data : t ));
            toast.success("Todo created successfully!");
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
                 setTodos((prev) => prev.filter(t => t.oId !== task.oId));
                toast.error(`Failed to create todo, ${error.message}`)
        }
    };

    const optionStyles = "font-mono bg-surface-elevated text-text";

    return (
        <div className={`fixed inset-0 flex items-center justify-center p-4 bg-background/80 backdrop-blur-blurry transition-opacity duration-normal ease-default
                ${isTextareaFocused ? 'items-start pt-12 lg:items-center lg:pt-0' : 'items-center'}`
                }>

        <form   onSubmit={handleSubmit} 
                className={`w-full p-4 font-sans text-center text-text border rounded-lg bg-surface/80
                 border-glass-border backdrop-blur-glass md:max-w-3xl md:p-8 md:text-lg transition-transform duration-300 ease-in-out 
                    ${isTextareaFocused ? '-translate-y-6 md:translate-y-0' : ''}`
                }>

            <textarea required
                className='w-full p-4 mb-2 font-sans text-text bg-transparent border rounded-md outline-none border-border/70 backdrop-blur-md focus:border-border-focus placeholder:text-text-muted'
                onChange={(e) => setTask({ ...task, taskContent: e.target.value })}
                onFocus={() => setIsTextareaFocused(true)}
                onBlur={() => setIsTextareaFocused(false)}
                id="taskInput"
                value={task.taskContent}
                placeholder='Enter Task...' />


            <div className='grid gap-2 grid-cols-1 px-2 sm:grid-cols-2 md:grid-cols-3 md:gap-4'>

                <select
                    className='h-10 font-sans text-center text-text rounded-md outline-none cursor-pointer bg-surface-elevated border border-border'
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
                    className='h-10 font-sans text-center text-text rounded-md outline-none cursor-pointer bg-surface-elevated border border-border'
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
                        className='h-10 w-full flex justify-center font-sans text-center text-text rounded-md outline-none cursor-text bg-surface-elevated border border-border'
                        style={{ colorScheme: 'dark' }}
                        onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
                        type="date"
                        id="deadDate"
                        value={task.dueDate}
                    />
            </div>
            
              <div className="flex items-end justify-center px-2 gap-2 md:justify-center md:gap-4">
                <button
                type="reset"
                onClick={() => setShowForm(false)}
                className={`text-md w-1/3 mt-4 text-center p-2 rounded-md flex-1 transition-all duration-normal md:mt-8
                        bg-surface-elevated text-text-muted hover:bg-surface-hover`
                        }  >
                Cancel
            </button>
            <button
                type="submit"
                disabled={task.taskContent.trim().length === 0 }
                className={`text-text text-md w-1/3 mt-4 text-center p-2 rounded-md flex-1 transition-all duration-normal md:mt-8
                                 ${task.taskContent.trim().length === 0
                        ? 'bg-surface-elevated cursor-not-allowed text-text-disabled'
                        : 'bg-success hover:bg-success/90 active:scale-105 active:bg-success/80 cursor-pointer'}`}>
               Add Task
            </button>
              </div>
        </form>
    </div>
    )
}