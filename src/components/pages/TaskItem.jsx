
export default function TaskItem({ todo, onToggle, onDelete, setUpdateData }) {
  const isDone = "text-sm text-gray-200 md:text-xl line-through opacity-50 transition duration-300 cursor-pointer";
  const notDone = "text-sm text-gray-100 md:text-xl transition duration-300 cursor-pointer";

  return (
    <div className="flex flex-col gap-2 p-2 rounded-md md:p-4 bg-transparent border border-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300">
      <div className="flex items-center justify-between gap-2">
        <p
          onClick={() => onToggle({ todoId: todo._id })}
          className={todo.completed ? isDone : notDone}
        >
          {todo.taskContent}
        </p>

        <div>
          <button
            className="px-2 text-lg text-gray-500 transition-all duration-300 rounded-md cursor-pointer"
            onClick={() => setUpdateData({ todo: todo })}
          >
            ⁝
          </button>
          <button
            className="px-2 text-lg text-red-500 transition-all duration-300 rounded-md cursor-pointer hover:scale-110"
            onClick={() => {
                onDelete({ todoId: todo._id });
            }}
          >
            ╳
          </button>
        </div>

      </div>

      <div className="flex items-baseline justify-start gap-4">
        {todo.priority && (
          <small className={`text-sm ${todo.priority === "high" ? "text-orange-600" : todo.priority === "medium" ? "text-yellow-500" : "text-green-500"}`}>
            {todo.priority && todo.priority === "high" ? "🔴 HIGH" : todo.priority === "medium" ? "🟠 MEDIUM" : "🟢 LOW"}
          </small>
        )}

        {todo.category && (
          <small className="text-sm">
            {todo.category === "personal" ? "👤 Personal" : todo.category === "school" ? "🎓 School" : todo.category === "work" ? "💼 Work" : todo.category === "shopping" ? "🛒 Shopping" : "📁 Others"}
          </small>
        )}

        {todo.dueDate && (
          <small className="flex-1 font-mono text-sm text-right">
            📅 {todo.dueDate.split("T")[0]}
          </small>
        )}
      </div>
    </div>
  );
}