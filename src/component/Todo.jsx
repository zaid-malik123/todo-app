import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";

function Todo() {
  const [tasks, setTasks] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  // Load tasks from localStorage on mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  // Update localStorage when tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const onSubmit = (data) => {
    const isExist = tasks.some(task => task.text.toLowerCase() === data.task.toLowerCase());
    if (isExist) {
      alert("This task already exists!");
    } else {
      setTasks(prev => [...prev, { text: data.task, completed: false }]);
    }
    reset();
  };

  const deleteTask = (index) => {
    setTasks(prev => prev.filter((_, i) => i !== index));
  };

  const toggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6 flex flex-col items-center'>
      <div className='w-full max-w-xl bg-white shadow-lg rounded-xl p-6'>
        <h1 className='text-4xl font-bold text-center text-blue-700 mb-6'>My Todo List</h1>

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col sm:flex-row gap-3 mb-6'>
          <input
            {...register("task")}
            required
            className='flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
            placeholder='Enter your task'
          />
          <button
            type="submit"
            className='bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition w-full sm:w-auto'
          >
            Add Task
          </button>
        </form>

        <ul className='space-y-3'>
          {tasks.length === 0 ? (
            <p className='text-center text-gray-500'>No tasks added yet.</p>
          ) : (
            tasks.map((task, index) => (
              <li key={index} className='flex justify-between items-center bg-gray-50 border rounded px-4 py-2 shadow-sm'>
                <div className='flex items-center gap-3'>
                  <input
                    type='checkbox'
                    checked={task.completed}
                    onChange={() => toggleTask(index)}
                    className='accent-blue-600 h-4 w-4'
                  />
                  <span className={`text-lg ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                    {task.text}
                  </span>
                </div>
                <i
                  onClick={() => deleteTask(index)}
                  className="ri-delete-bin-7-fill text-red-500 text-xl cursor-pointer hover:text-red-600"
                ></i>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default Todo;