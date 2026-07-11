import { useState } from "react";
import TaskItem from "./TaskItem";
import UpdateForm from "./UpdateForm";
import DeleteModal from "./DeleteTodoModal";
import toast from 'react-hot-toast';
import { apiRequestHelper } from "../../api";

const TaskList = ({ todos, setTodos, token }) => {
    const [showUpdateForm, setShowUpdateForm] = useState(false);
     const [deleteTargetId, setDeleteTargetId] = useState(null);

    const [updateData, setUpdateData] = useState({
        taskContent: "",
        category: "",
        priority: "",
        dueDate: "",
        completed: false,
    })

    const handleUpdateForm = ({ todo }) => {
        if(todo) {
            setUpdateData({...todo});
        }
        setShowUpdateForm(true);
    }

    const handleUpdate = async ({ todoId }) => {
        const previousTodo = todos.find(t => t._id === todoId);
        setTodos((prev) => prev.map(t => t._id === todoId ? updateData : t)); // Optimistically update the UI

        try {
            const data = await apiRequestHelper(`/api/todos/${todoId}`, {
                method: "PATCH",
                token,
                body: updateData,
            });
            toast.success("Task updated successfully!");
            setTodos((prev) => prev.map((t) => t._id === todoId ? data : t ));
            
        } catch (err) {
                toast.error(`Failed to update todo, ${err.message}`);
                setTodos((prev) => prev.filter(t => t._Id === todoId ? previousTodo : t));  // if server update fails, Revert Optimistic Update by fetching the latest todos from the server
        }
    }

    const confirmDelete = ({ todoId }) => {
        setDeleteTargetId(todoId); // just open the modal
    }

    const handleDelete = async () => {
        const todoId = deleteTargetId;
        setDeleteTargetId(null); // close modal immediately
        const deletedTodo = todos.find(t => t._id === todoId);

        setTodos((prev) => prev.filter(t => t._id !== todoId));

        try {
            await fetch(`/api/todos/${todoId}`, {
                method: "DELETE",
                token,
            });
            toast.success("Task deleted!");
             
        } catch (err) {
            console.error(err.message || err);
            toast.error(`Failed to delete task, ${err.error}`);
            setTodos((prev) => [deletedTodo, ...prev]);
        }
    }

    const handleToggle = async ({ todoId }) => {

        // INFO:  READ STATE FIRST — PREVENT STALE CLOSURE/SNAPSHOT
            // capture what we need from the current render's snapshot
            // before anything changes. If we read `todos` later (after setTodos()),
            // we risk reading a stale snapshot, especially on rapid clicks.

    const todo = todos.find(t => t._id === todoId);
    const newCompleted = !todo.completed;
            // newCompleted is now a plain boolean — not tied to state at all.
            // No matter what happens to `todos` after this line, newCompleted won't change.

        // INFO: OPTIMISTIC UPDATE — schedule the UI change.
            // We use the already-computed newCompleted instead of !t.completed inside here,
            // so both the UI update and the server request use the exact same value.
    setTodos((prev) => prev.map(t =>
        t._id === todoId ?
        { ...t, completed: newCompleted } : t));

    try {
        await fetch(`/api/todos/${todoId}`, {
            method: "PATCH",
            token,
            // Use newCompleted here — NOT !todo.completed or !todos.find(...)
            // because by this point, `todos` state might be stale
            // especially if the user clicked again before this await resolved
            body: { completed: newCompleted },
        });

    } catch (err) {
        toast.error(`Failed to toggle todo, ${err.message}`);
          setTodos((prev) => prev.map(t => 
                t._id === todoId ? 
                { ...t, completed: todo.completed } : t
            ));
    }
}

    const getTodoKey = (todo) => todo._id || todo.oId;

    return (
        <>
            <div className='flex-1 w-full h-full max-h-screen p-4 mb-4 space-y-2 overflow-y-auto font-sans text-center text-white border rounded-lg bg-linear-to-b from-black/30 to-black/40 bg-black/40 border-white/20 backdrop-blur-lg md:mx-auto md:max-w-3xl md:p-8 md:text-lg'>
            {todos.length === 0 ? (
                <p className="my-16 text-white/40"> No Todos yet!</p>
            ) : (

                todos.map((todo) => (
                    <TaskItem key={getTodoKey(todo)} todo={todo} onToggle={handleToggle} onDelete={confirmDelete} setUpdateData={handleUpdateForm} /> 
                ))

            )}
        </div>

        {showUpdateForm && (

            <UpdateForm handleUpdate={handleUpdate} setShowUpdateForm={setShowUpdateForm} task={updateData} setTask={setUpdateData} />
        )}

        {deleteTargetId && (
                <DeleteModal
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteTargetId(null)}
                />
            )}
        </>
    )
}

export default TaskList
