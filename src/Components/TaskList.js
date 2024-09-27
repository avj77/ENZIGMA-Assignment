import React, { useState } from 'react';
import { Table, Button, InputGroup, FormControl, Modal } from 'react-bootstrap';

const TaskList = ({ tasks, handleEditTask, handleDeleteTask, setShowModal }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const confirmDelete = (task) => {
    setTaskToDelete(task);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    handleDeleteTask(taskToDelete);
    setShowConfirmModal(false);
    setTaskToDelete(null);
  };

  return (
    <div className="container mt-4">
      <h2>TASKS by ajinkya</h2>
      <h5>ALL TASKS</h5> {/* Subheading for All Tasks */}
      
      <div className="d-flex justify-content-end mb-2">
        <Button variant="primary" onClick={() => setShowModal(true)} className="me-2">New Task</Button>
        <Button variant="outline-secondary" className="me-2">Refresh</Button>
      </div>

      <InputGroup className="mb-3" style={{ width: '180px', marginLeft : '1110px' }}>
        <FormControl placeholder="Search" />
      </InputGroup>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>{task.assignedTo}</td>
              <td>{task.status}</td>
              <td>{task.dueDate}</td>
              <td>{task.priority}</td>
              <td>{task.description}</td>
              <td>
                <Button variant="warning" onClick={() => handleEditTask(task)}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => confirmDelete(task)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Delete Confirmation Modal */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
      <Modal.Header closeButton style={{ backgroundColor: '#f44336' }}>
        <Modal.Title className="w-100 text-center">Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Do you want to delete '{taskToDelete?.description}'?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            No
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TaskList;
