import { MdDeleteForever, MdEdit  } from "react-icons/md";

export default function TaskItem({ todo, onToggle, onDelete, setUpdateData }) {
  const isDone = "text-sm text-gray-200 md:text-xl line-through opacity-50 transition duration-300 cursor-pointer";
  const notDone = "text-sm text-gray-100 md:text-xl transition duration-300 cursor-pointer";

  return (
    <div className="flex flex-col gap-1 p-2 rounded-md md:p-4 bg-transparent border border-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300">
      
      <div className="flex items-center justify-start gap-2 px-2">
        < input type="checkbox" name="toggleBtn" id="toggleTodo" 
          onClick={() => onToggle({ todoId: todo._id })} />
          
        <p className={todo.completed ? isDone : notDone} >
          {todo.taskContent}
        </p>

      </div>

      <div className="flex items-baseline justify-between gap-4">
          <div className="flex flex-1 justify-around items-center">
              {todo.priority && (
                <small className={`text-xs opacity-80 ${todo.priority === "high" ? "text-orange-600" : todo.priority === "medium" ? "text-yellow-500" : "text-green-500"}`}>
                   {todo.priority && todo.priority === "high" ? "HIGH" : todo.priority === "medium" ? "MEDIUM" : "LOW"}
                </small>
              )}

              {todo.category && (
                <small className="text-xs opacity-80">
                  {todo.category === "personal" ? "👤 Personal" : todo.category === "school" ? "🎓 School" : todo.category === "work" ? "💼 Work" : todo.category === "shopping" ? "🛒 Shopping" : "📁 Others"}
                </small>
              )}

              {todo.dueDate && (
                <small className="text-xs opacity-80 whitespace-nowrap">
                 📅 {todo.dueDate.split("T")[0]}
                </small>
              )}
          </div>

            <div className="min-w-fit space-x-2">
                <button
                  className="text-gray-500 cursor-pointer"
                  onClick={() => setUpdateData({ todo: todo }) }
                 aria-label="Edit task" >
                  <MdEdit />
                </button>
                <button
                  className="text-red-500 cursor-pointer"
                  onClick={() =>  onDelete({ todoId: todo._id }) } 
                  aria-label="Delete Task">
                    <MdDeleteForever />
                </button>
            </div>
      </div>
    </div>
  );
}