import { MdDeleteForever, MdEdit } from "react-icons/md";

const PRIORITY_LABELS = {
  high: ["HIGH", "text-orange-600"],
  medium: ["MEDIUM", "text-yellow-500"],
  low: ["LOW", "text-green-500"],
};

export default function TaskItem({ todo, onToggle, onDelete, setUpdateData }) {
  const isDone = "text-sm text-gray-200 md:text-lg line-through opacity-50 transition duration-300 cursor-pointer";
  const notDone = "text-sm text-gray-100 md:text-lg transition duration-300 cursor-pointer";

  const [priorityLabel, priorityClass] = PRIORITY_LABELS[todo.priority] || [null, null];
  const dueDateLabel = todo.dueDate ? todo.dueDate.split("T")[0] : null;

  return (
    <div className="flex flex-col justify-between gap-2 p-2 text-white md:p-4 rounded-md bg-black/40 border border-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300">
      
      <div className="flex items-center justify-start gap-2 px-2">
        <input
          type="checkbox"
          name="toggleBtn"
          id="toggleTodo"
          checked={todo.completed}
          onChange={() => onToggle({ todoId: todo._id })}
          aria-label="Toggle task completed"
        />
        <p className={`${todo.completed ? isDone : notDone} min-w-0`}>
          {todo.taskContent}
        </p>

      </div>

      <div className="flex px-2 items-baseline justify-between gap-4 ">
          <div className="flex flex-wrap items-center gap-2">
              {priorityLabel && (
                <small className={`text-xs opacity-80 ${priorityClass}`}>
                  {priorityLabel}
                </small>
              )}

              {todo.category && (
                <small className="text-xs opacity-80">
                  {todo.category === "personal" ? "👤 Personal" : todo.category === "school" ? "🎓 School" : todo.category === "work" ? "💼 Work" : todo.category === "shopping" ? "🛒 Shopping" : "📁 Others"}
                </small>
              )}

              {dueDateLabel && (
                <small className="text-xs opacity-80 whitespace-nowrap">
                 📅 {dueDateLabel}
                </small>
              )}
          </div>

            <div className="flex gap-4">
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