import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
  // State variables
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  // Function to add or edit a task
  function handleAddTask(e) {
    e.preventDefault(); // Prevent form from refreshing the page

    if (!task.trim()) {
      return toast.error('Please enter a task');
    }

    if (editIndex > -1) {
      // Update existing task
      const updatedTasks = tasks.map((item, index) =>
        index === editIndex ? task : item
      );
      setTasks(updatedTasks);
      setEditIndex(-1);
    } else {
      // Add new task
      setTasks([...tasks, task]);
    }

    setTask(''); // Clear the input field
  }

  // Function to delete a task
  function handleDeleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    if (editIndex === index) {
      setEditIndex(-1);
    }
  }

  // Function to start editing a task
  function handleEditTask(index) {
    setTask(tasks[index]);
    setEditIndex(index);
  }

  // Function to cancel editing
  function handleCancelEdit() {
    setTask('');
    setEditIndex(-1);
  }

  return (
    <div className='main-div'>
      <div>
        <h1>Todo List</h1>
        <form onSubmit={handleAddTask}>
          <input
            type='text'
            name='task'
            id='task'
            placeholder='Add Task'
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button type='submit' className='submitButton'>
            {editIndex > -1 ? 'Update' : 'Add'}
          </button>
        </form>
        <table className='todo-table'>
          <thead>
            <tr>
              <th>Tasks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((item, index) => (
              <tr key={index}>
                <td>
                  {editIndex === index ? (
                    <input
                      type='text'
                      value={task}
                      onChange={(e) => setTask(e.target.value)}
                    />
                  ) : (
                    <span>{item}</span>
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <button onClick={handleCancelEdit} className='cancel-btn'>
                      Cancel
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditTask(index)}
                        className='edit-btn'
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTask(index)}
                        className='delete-btn'
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ToastContainer />
      </div>
    </div>
  );
};

export default App;