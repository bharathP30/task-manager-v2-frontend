import { useState, useEffect } from "react";
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
            const res = await fetch(`${api}/todos/${todoId}`, {
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
            const res = await fetch(`${api}/todos/${todoId}`, {
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

        setTodos((prev) => prev.map(t => t._id === todoId ? {...t, completed: !t.completed} : t)); // Optimistically update the UI

        try {
            const todo = todos.filter(t => t._id === todoId);

            const res = await fetch(`${api}/todos/${todoId}`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ completed: !todo[0].completed }),
            })

            if (!res.ok) {
                return console.error("error has occured while toggling");
            }

            const data = await res.json();
            console.log("toggled todo is, ", data);
            fetchTodos();

        } catch (err) {
            console.log(err);
            console.error("error has occured while toggling");
            fetchTodos();  // if server update fails, Revert Optimistic Update by fetching the latest todos from the server
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
