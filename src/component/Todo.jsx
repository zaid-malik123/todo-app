import React, { useState } from 'react'
import { useForm } from "react-hook-form"

function Todo() {
  const [dataa, setDataa] = useState([])  
  const { register, handleSubmit, reset } = useForm()

  const formData = (data) => {
    // Check if the task already exists in the list
    const isTaskExist = dataa.some(task => task.toLowerCase() === data.task.toLowerCase());

    if (isTaskExist) {
      alert("This task already exists!");
    } else {
      // Spread the existing array, then append the new task
      setDataa(prev => [...prev, data.task]);
    }

    // Clear the input field after submission
    reset();
  }

  const removeButton = (idx) => {
    setDataa(prev => prev.filter((_, i) => i !== idx));
  }

  return (
    <div className='min-h-screen bg-gray-50 p-10 flex flex-col items-center'>
      <h1 className='text-3xl font-bold mb-6'>Your Todo List</h1>
      <form onSubmit={handleSubmit(formData)} className='flex gap-2 mb-8'>
        <input
          {...register("task")}
          className='border rounded px-4 py-2 w-72 focus:outline-none'
          placeholder='Enter your Task'
        />
        <button
          type="submit"
          className='bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition'
        >
          Add
        </button>
      </form>

      <ul className='w-full max-w-md space-y-2'>
        {dataa.map((val, idx) => (
          <li 
            key={idx}
            className='flex justify-between items-center bg-white shadow p-3 rounded'
          >
            <span className='text-gray-800'>{val}</span>
            <i
              onClick={() => removeButton(idx)}
              className="ri-delete-bin-7-fill text-red-500 cursor-pointer"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Todo
