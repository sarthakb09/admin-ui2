import React from "react";
import { useState, useEffect } from "react";
import { Container,Stack, Row, Col, Form, Table } from "react-bootstrap";
import axios from "axios";
//import { useSnackbar } from "notistack";
import Button from "@mui/material/Button";
import EditUserOnly from "./EditUserOnly";
import Search from "./Search";
import CustomPagination from "./CustomPagination";
//import { FormControlUnstyledContext } from "@mui/base";

const TableData=()=> {
  const [users, setUsers] = useState([]);
  //const { enqueueSnackbar } = useSnackbar();
  const [usersFiltered, setUsersFiltered] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [findUser, setFindUser] = useState("");
  const [allChecked, setAllChecked] = useState(false);
  const [userUpdate, setUserUpdate] = useState(null);
  const [usersSelected, setUsersSelected] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const page = 10;


  const URL =
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";


  const updateUser = (userId) => {
    setUserUpdate(userId);
    setShowEdit(true);
  };

  const data = async () => {
    try {
      const res = await axios.get(URL);
      setUsers(res.data);
    } catch (err) {
      console.log("Fetching users data failed", err);
    }
  };

  const handleDeleteAll = () => {
    const newList = users.filter(
      (user) => !usersSelected.includes(user.id)
    );

    const newFilteredList = usersFiltered.filter(
      (user) => !usersSelected.includes(user.id)
    );

    setUsers(newList);
    setUsersFiltered(newFilteredList);
    setAllChecked(false);

    if (usersSelected.length) {
      console.log("Data deleted successfully ")
    } else {
      console.log("No data selected to delete ")
    }
  };

  const handleSelectAll = (event) => {
    let newList = [...usersSelected];
    if (event.target.checked) {
      setAllChecked(true);
      newList = currentUsers.map((user) => user.id);
    } else {
      setAllChecked(false);
      newList = [];
    }
    setUsersSelected(newList);
  };

  const handleSelect = (event) => {
    let newList = [...usersSelected];
    const userId = event.target.value;

    if (event.target.checked) {
      newList = [...usersSelected, userId];
    } else {
      setAllChecked(false);
      newList.splice(usersSelected.indexOf(userId), 1);
    }
    setUsersSelected(newList);
  };

  const handleDelete = (userId) => {
    const newList = users.filter((user) => user.id !== userId);
    console.log("Data deleted successfully")
    setUsers(newList);
  };

  const search = (event) => {
    setFindUser(event.target.value);
  };

  const filter = () => {
    if (findUser === "") {
      
      setUsersFiltered(users);
    } else {
      
      const result = users.filter((obj) =>
        Object.keys(obj).some((key) => obj[key].includes(findUser))
      );
      setUsersFiltered(result);
    }
  };

  useEffect(() => {
    data();
  }, []);

  useEffect(() => {
    filter();
  }, [users, findUser]);

  const paginate = (pageNumber) => {
    if (!allChecked) {
      setAllChecked(false);
    }
    setCurrentPage(pageNumber);
  };

  const indexLastUser = currentPage * page;
  const indexFirstUser = indexLastUser - page;
  const currentUsers = usersFiltered.length
    ? usersFiltered.slice(indexFirstUser, indexLastUser)
    : users.slice(indexFirstUser, indexLastUser);
  const totalUsers = usersFiltered.length;
  const totalPage = Math.ceil(totalUsers / page);


  return (
    <Container>
      <Row>
        <Col>
          <Search search={search} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Table>
            <thead>
              <tr>
                <th>
                  <Form.Check
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={allChecked}
                  />
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>
                      <Form.Check
                        type="checkbox"
                        value={user.id}
                        checked={usersSelected.includes(user.id)}
                        onChange={handleSelect}
                      />
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <Stack direction="horizontal">
                        <Button
                          size="sm"
                          variant="link"
                          onClick={() => updateUser(user.id)}
                        >
                          <i className="bi bi-pencil-fill text-primary"></i>
                        </Button>

                        <Button
                          size="sm"
                          variant="link"
                          onClick={() => handleDelete(user.id)}
                        >
                          <i className="bi bi-trash-fill text-danger"></i>
                        </Button>
                      </Stack>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
      {
        <Row className="pt-2 pt-md-0">
          <Col xs="12" md="4" sm="6">
            <Button
              variant="contained"
              onClick={handleDeleteAll}
              color="secondary"
            >
              Delete the selected users
            </Button>
          </Col>
          <Col xs="12" md="8" sm="6">
            <CustomPagination
              currentPage={currentPage}
              checked={allChecked}
              paginate={paginate}
              totalPage={totalPage}
              disabled={usersSelected.length > 0 ? false : true}
            />
          </Col>
        </Row>
      }
      {showEdit ? (
        <EditUserOnly
          users={users}
          userId={userUpdate}
          setUsers={setUsers}
          setShowEdit={setShowEdit}
          onHide={() => setShowEdit(false)}
          show={showEdit}
        />
      ) : null}
    </Container>
  );
}

export default TableData;