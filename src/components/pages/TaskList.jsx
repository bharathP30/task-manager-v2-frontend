import { useState } from "react";
import TaskItem from "./TaskItem";
import UpdateForm from "./UpdateForm";

const TaskList = ({ todos, setTodos, fetchTodos, api, token }) => {
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    const [updateData, setUpdateData] = useState({
        taskContent: "",
        category: "",
        priority: "",
        dueDate: "",
        completed: false,
    })
    const handleUpdateForm = ({ todo }) => {
        console.log(todo);
        if(todo) {
            setUpdateData({...todo});
        }
        setShowUpdateForm(true);
    }

    const handleUpdate = async ({ todoId }) => {
        setTodos((prev) => prev.map(t => t._id === todoId ? updateData : t)); // Optimistically update the UI

        try {
            const res = await fetch(`${api}/api/todos/${todoId}`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    // include authorization if required by backend
                    "authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(updateData),
            })
            const data = await res.json();

            if (!res.ok) {
                console.error("error has occured while updating", data.error);
                return;
            }

            console.log("updated data is, ", data);
            fetchTodos();
            
        } catch (err) {
            console.log(err);
            console.error("error has occured while updating");
            fetchTodos();  // if server update fails, Revert Optimistic Update by fetching the latest todos from the server
        }
    }

    const handleDelete = async ({ todoId }) => {

        setTodos((prev) => prev.filter(t => t._id !== todoId)); // Optimistically update the UI

        try {
            const res = await fetch(`${api}/api/todos/${todoId}`, {
                method: "DELETE",
                headers: {
                    "authorization": `Bearer ${token}`,
                },
            })
            const data = await res.json();

            if (!res.ok) {
                alert(data.error);
                return console.error(data.error);
            }

            console.log("deleted todo is, ", data);
            fetchTodos();

        } catch (err) {
            console.log(err);
            console.error("error has occured while deleting");
            fetchTodos();  // if server update fails, Revert Optimistic Update by fetching the latest todos from the server
        }
    }

    const handleToggle = async ({ todoId }) => {

    // INFO:  READ FIRST — PREVENT STALE CLOSURE/SNAPSHOT
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
        t._id === todoId ? { ...t, completed: newCompleted } : t
    ));

    try {
        const res = await fetch(`${api}/api/todos/${todoId}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${token}`,
            },
            // Use newCompleted here — NOT !todo.completed or !todos.find(...)
            // because by this point, `todos` state might be stale
            // (especially if the user clicked again before this await resolved)
            body: JSON.stringify({ completed: newCompleted }),
        });

        if (!res.ok) {
            // Server rejected the update — revert by fetching real data
            console.error("error has occured while toggling");
            fetchTodos();
            return;
        }

        const data = await res.json();
        console.log("toggled todo is, ", data);
        fetchTodos();

    } catch (err) {
        console.log(err);
        console.error("error has occured while toggling");
        // Network failed — revert optimistic update by fetching real data from server
        fetchTodos();
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
                    <TaskItem key={getTodoKey(todo)} todo={todo} onToggle={handleToggle} onDelete={handleDelete} setUpdateData={handleUpdateForm} /> 
                ))

            )}
        </div>

        {showUpdateForm && (

            <UpdateForm handleUpdate={handleUpdate} setShowUpdateForm={setShowUpdateForm} task={updateData} setTask={setUpdateData} />
        )}
        </>
    )
}

export default TaskList
