// App.js
import React, { useState } from 'react';
import TaskList from './Components/TaskList';
import TaskModal from './Components/TaskModal';

function App() {
  const [tasks, setTasks] = useState([
    { assignedTo: 'User 1', status: 'Completed', dueDate: '2024-10-12', priority: 'Low', description: 'This task is good' },
    { assignedTo: 'User 2', status: 'In Progress', dueDate: '2024-09-14', priority: 'High', description: 'This task is important' },
    { assignedTo: 'User 3', status: 'Not Started', dueDate: '2024-08-18', priority: 'Low', description: 'Pending work' },
    { assignedTo: 'User 4', status: 'In Progress', dueDate: '2024-06-12', priority: 'Normal', description: 'Ongoing task' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleSaveTask = (task) => {
    if (selectedTask) {
      // Edit existing task
      const updatedTasks = tasks.map((t) => (t.description === selectedTask.description ? { ...task } : t));
      setTasks(updatedTasks);
    } else {
      // Add new task
      setTasks([...tasks, task]);
    }
    setShowModal(false);
    setSelectedTask(null);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleDeleteTask = (taskToDelete) => {
    const updatedTasks = tasks.filter((t) => t.description !== taskToDelete.description);
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <TaskList
        tasks={tasks}
        handleEditTask={handleEditTask}
        handleDeleteTask={handleDeleteTask}
        setShowModal={setShowModal}
      />
      <TaskModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={handleSaveTask}
        task={selectedTask}
      />
    </div>
  );
}

export default App;
