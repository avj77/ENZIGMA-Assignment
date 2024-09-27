// TaskModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const TaskModal = ({ show, handleClose, handleSave, task }) => {
  const [formData, setFormData] = useState({
    assignedTo: '',
    status: '',
    dueDate: '',
    priority: '',
    description: ''
  });

  const [errors, setErrors] = useState({});
  
  // List of users, statuses, and priorities
  const users = ['User 1', 'User 2', 'User 3', 'User 4'];
  const statuses = ['Completed', 'In Progress', 'Not Started'];
  const priorities = ['High', 'Normal', 'Low'];

  useEffect(() => {
    if (task) {
      setFormData(task);
    } else {
      setFormData({
        assignedTo: '',
        status: '',
        dueDate: '',
        priority: '',
        description: ''
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Basic validation
    const newErrors = {};
    if (!formData.assignedTo) newErrors.assignedTo = 'Assigned To is required';
    if (!formData.status) newErrors.status = 'Status is required';
    if (!formData.priority) newErrors.priority = 'Priority is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      handleSave(formData);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{task ? 'Edit Task' : 'New Task'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group controlId="assignedTo">
                <Form.Label>
                  Assigned To <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Select name="assignedTo" value={formData.assignedTo} onChange={handleChange}>
                  <option value="">Select a user</option>
                  {users.map((user, index) => (
                    <option key={index} value={user}>{user}</option>
                  ))}
                </Form.Select>
                {errors.assignedTo && <Form.Text style={{ color: 'red' }}>{errors.assignedTo}</Form.Text>}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="status">
                <Form.Label>
                  Status <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Select name="status" value={formData.status} onChange={handleChange}>
                  <option value="">Select status</option>
                  {statuses.map((status, index) => (
                    <option key={index} value={status}>{status}</option>
                  ))}
                </Form.Select>
                {errors.status && <Form.Text style={{ color: 'red' }}>{errors.status}</Form.Text>}
              </Form.Group>
            </Col>
          </Row>
          <br/>
          <Row>
            <Col md={6}>
              <Form.Group controlId="dueDate">
                <Form.Label>Due Date</Form.Label>
                <Form.Control type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="priority">
                <Form.Label>
                  Priority <span style={{ color: 'red' }}>*</span>
                </Form.Label>
             
                <Form.Select name="priority" value={formData.priority} onChange={handleChange}>
                  <option value="">Select priority</option>
                  {priorities.map((priority, index) => (
                    <option key={index} value={priority}>{priority}</option>
                  ))}
                </Form.Select>
                {errors.priority && <Form.Text style={{ color: 'red' }}>{errors.priority}</Form.Text>}
              </Form.Group>
            </Col>
          </Row>
          <br/>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskModal;
