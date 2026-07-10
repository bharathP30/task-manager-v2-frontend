export default function UpdateForm({ handleUpdate, setShowUpdateForm, task, setTask }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        // NOTE: pass the id of the task being edited; the parent holds the updated
        // NOTE: data in its state (`task` prop), so we only need the id here.
        handleUpdate({ todoId: task._id });
        setShowUpdateForm(false);
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">

            <form onSubmit={handleSubmit}
         className='w-full p-4 font-sans text-center text-white border rounded-lg bg-black/70 border-white/20 backdrop-blur-lg md:max-w-3xl md:p-8 md:text-lg'>

            <input required
                className='w-full p-2 mx-auto my-8 font-sans text-gray-100 bg-transparent border rounded-sm outline-none border-white/10 backdrop-blur-md focus:ring-1 ring-white/10 placeholder-white/40'
                onChange={(e) => setTask({ ...task, taskContent: e.target.value })}
                type="text"
                id="taskInput"
                value={task.taskContent}
                placeholder='Enter Task...' />


            <div className='grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4'>

                <select
                    className='h-10 font-sans text-center text-white border rounded-md outline-none cursor-pointer bg-gray-900/50  border-white/10 '
                    onChange={(e) => setTask({ ...task, category: e.target.value })}
                    name="categoryType"
                    id="categoryType"
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
                    className='h-10 font-sans text-center text-white border rounded-md outline-none cursor-pointer bg-gray-900/50  border-white/10 '
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

                <input required
                    className='h-10 px-4 font-sans text-center text-white border rounded-lg outline-none bg-gray-900/50  border-white/10 cursor-text '
                    onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
                    type="date"
                    id="deadDate"
                    value={task.dueDate? task.dueDate.split("T")[0] : ""}
                />

            </div>
          <div className='flex items-end justify-between gap-2 md:justify-center md:gap-4'>
              <button
                type="reset"
                onClick={() => setShowUpdateForm(false)}
                className={`text-md w-1/3 mt-4 text-center p-2 rounded-md flex-1 
                            transition-all duration-200 md:mt-8
                        bg-gray-500 text-gray-700`
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
                        : 'bg-green-500 cursor-pointer active:scale-105 active:bg-green-600'}`}
            >
                Add Task
            </button>
          </div>
        </form>
        </div>
    )
}