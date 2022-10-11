import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { Modal } from "react-bootstrap";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const EditUserOnly=({ users, setUsers, userId, setShowEdit, ...props })=> {
  const userUpdate = users.find((user) => user.id === userId);
  const { enqueueSnackbar } = useSnackbar();

  const [formValue, setFormValue] = useState({
    email: userUpdate.email,
    name: userUpdate.name,
    role: userUpdate.role,
  });

  const handleSubmit = () => {
    const newList = users.map((item) => {
      if (item.id === userId) {
        return { ...item, ...formValue };
      }
      return item;
    });
    enqueueSnackbar("Data Updated successfully ", { variant: "info" });
    setUsers(newList);
    setShowEdit(false);
  };

  const handleChange = (event) => {
    let { id, value } = event.target;
    if (value.trim().length === 0) {
      value = formValue[name];
    }
    setFormValue((values) => {
      return {
        ...values,
        [id]: value.trim(),
      };
    });
  };
  const { email, name, role } = formValue;

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Update user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TextField
          type="text"
          id="name"
          placeholder={name}
          onChange={handleChange}
          variant="filled"
        />

        <TextField
          type="email"
          id="email"
          placeholder={email}
          onChange={handleChange}
          variant="filled"
        />

        <TextField
          type="text"
          id="role"
          placeholder={role}
          onChange={handleChange}
          variant="filled"
        />
      </Modal.Body>
      <Modal.Footer gap={2}>
        <Button variant="contained" color="success" onClick={handleSubmit}>
          Confirm
        </Button>
        <hr />
        <Button
          variant="contained"
          color="error"
          onClick={() => setShowEdit(false)}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditUserOnly;