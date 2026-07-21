import { useState } from "react";

export default function UpdateForm({ handleUpdate, setShowUpdateForm, task, setTask }) {
    const [isTextareaFocused, setIsTextareaFocused] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // NOTE: pass the id of the task being edited; the parent holds the updated
        // NOTE: data in its state (`task` prop), so we only need the id here.
        handleUpdate({ todoId: task._id });
        setShowUpdateForm(false);
    }

    return (
        <div className={`fixed inset-0 flex items-center justify-center p-4 bg-background/80 backdrop-blur-blurry transition-opacity duration-normal ease-default
                    ${isTextareaFocused ? 'items-start pt-12 lg:items-center lg:pt-0' : 'items-center'}`
                }>

            <form onSubmit={handleSubmit}
                    className={`w-full p-4 font-sans text-center text-text border rounded-lg bg-surface/80
                     border-glass-border backdrop-blur-glass md:max-w-3xl md:p-8 md:text-lg transition-transform duration-300 ease-in-out
                        ${isTextareaFocused ? '-translate-y-6 md:translate-y-0' : ''}`
                    }>

                    <textarea required
                       className='w-full p-2 mx-auto my-4 font-sans text-text bg-transparent border rounded-sm outline-none border-border/70 backdrop-blur-md focus:border-border-focus placeholder:text-text-muted'
                       onChange={(e) => setTask({ ...task, taskContent: e.target.value })}
                       onFocus={() => setIsTextareaFocused(true)}
                       onBlur={() => setIsTextareaFocused(false)}
                       id="taskInput"
                       value={task.taskContent}
                       placeholder='Enter Task...' />

                    <div className='grid grid-cols-1 gap-2 px-2 sm:grid-cols-2 sm:gap-4 md:grid-cols-3'>

                        <select
                            className='h-10 font-sans text-center text-text border rounded-md outline-none cursor-pointer bg-surface-elevated border-border'
                            onChange={(e) => setTask({ ...task, category: e.target.value })}
                            name="categoryType" id="categoryType"
                            value={task.category}
                        >
                            <option value="" disabled>Category</option>
                            <option value="personal">Personal</option>
                            <option value="school">School</option>
                            <option value="work">Work</option>
                            <option value="shopping">Shopping</option>
                            <option value="others">Others</option>
            
                        </select>

                        <select
                            className='h-10 font-sans text-center text-text border rounded-md outline-none cursor-pointer bg-surface-elevated border-border'
                            onChange={(e) => setTask({ ...task, priority: e.target.value })}
                            name="priorityType"
                            id="priorityType"
                            value={task.priority}
                        >
                            <option value="" disabled>Priority</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>

                        <div className="flex justify-center">
                            <input required
                                className='flex justify-center h-10 w-full px-4 font-sans text-center text-text border rounded-md outline-none bg-surface-elevated border-border cursor-text '
                                style={{ textAlign: 'center', colorScheme: 'dark' }}
                                onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
                                type="date"
                                id="deadDate"
                                value={task.dueDate? task.dueDate.split("T")[0] : ""}
                                placeholder="dd-mm--yyyy"
                            />
                        </div>
                    </div>

                    <div className='flex items-end justify-between px-2 gap-2 md:justify-center md:gap-4'>
                        <button
                            type="reset"
                            onClick={() => setShowUpdateForm(false)}
                            className={`text-md w-1/3 mt-4 text-center p-2 rounded-md flex-1 transition-all duration-normal md:mt-8
                                    bg-surface-elevated text-text-muted hover:bg-surface-hover`
                                    } >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={task.taskContent.trim().length === 0}
                            className={`text-text text-md w-1/3 mt-4 text-center p-2 rounded-md flex-1 transition-all duration-normal md:mt-8
                                             ${task.taskContent.trim().length === 0
                                    ? 'bg-surface-elevated cursor-not-allowed text-text-disabled'
                                    : 'bg-success hover:bg-success/90 cursor-pointer active:scale-105 active:bg-success/80'}`} >
                            Update Task
                        </button>
                    </div>
            </form>
        </div>
    )
}