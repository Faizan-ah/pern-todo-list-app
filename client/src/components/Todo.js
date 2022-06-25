import React, { useEffect, useState } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import styled from "styled-components";
import Switch from "react-switch";
import {
   Button,
   Card,
   EditButton,
   FormTitle,
   DeleteButton,
   AddButton,
   ErrorDisplay,
} from "../styledComponents/general";
import {
   createTodo,
   deleteTodo,
   getTodoList,
   updateTodo,
} from "../actions/actions";
import { getAuthToken } from "../utils/localstorage";
const TodoItem = styled.div`
   border: 1px solid rgba(0, 0, 0, 0.125);
   border-radius: 0.25rem;
   width: 80%;
   display: flex;
   align-items: center;
   height: max-content;
   padding: 1em 1em 1em 1em;
   background: ${(props) => (props.checked ? "palevioletred" : "white")};
   margin-bottom: 5px;
   justify-content: space-between;
`;
const TodoLabel = styled.label`
   font-size: large;
   margin-left: 10px;
   display: flex;
   align-items: center;
   margin-bottom: 0.2rem;
`;
const TodoWrapper = styled.div`
   display: flex;
   justify-content: center;
   flex-direction: column;
   align-items: center;
   min-height: fit-content;
   max-height: 70vh;
   overflow-y: auto;
`;
const TodoCheckBox = styled.input`
   height: 20px;
   width: 20px;
`;
const NoTodos = styled.h3`
   font-weight: bolder;
   text-align: center;
`;
const TodoInfo = styled.div`
   display: flex;
   align-items: center;
`;
const TodoActions = styled.div``;
const AddTodo = styled.div`
   display: flex;
   margin: 5px 0px 5px 0px;
`;
const AddTodoLabel = styled.label`
   font-size: larger;
   display: flex;
   align-items: center;
   margin: 0px 10px 0px 0px;
`;
const AddTodoInput = styled.input`
   display: block;
   width: 100%;
   height: calc(1.5em + 0.75rem + 2px);
   padding: 0.375rem 0.75rem;
   font-size: 1rem;
   font-weight: 400;
   line-height: 1.5;
   color: #495057;
   background-color: #fff;
   background-clip: padding-box;
   border: 1px solid #ced4da;
   border-radius: 0.25rem;
   transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
   overflow: visible;
`;
const Todo = (props) => {
   const { dispatch, loading, success, error, todo, deleteSuccess, token } =
      props;
   const [todoList, setTodoList] = useState([]);
   const [completed, setCompleted] = useState(false);
   const [modalOpen, setModalOpen] = useState(false);
   const [addModal, setAddModal] = useState(true);
   const [id, setId] = useState("");
   const [firstTime, setFirstTime] = useState(true);
   const [description, setDescription] = useState("");
   useEffect(() => {
      const localToken = getAuthToken();
      console.log(localToken);
      if (todo?.length === 0 && firstTime && localToken) {
         dispatch(getTodoList());
         setFirstTime(false);
      }
      setTodoList(todo);
   }, [todo]);

   const updateTodoItem = async () => {
      if (id !== "" && description.length !== 0) {
         document.getElementById("addError").style.display = "none";
         await dispatch(updateTodo({ id, description, completed }));
         await dispatch(getTodoList());
         toggleModal();
      } else {
         document.getElementById("addError").style.display = "flex";
      }
   };

   const deleteTodoItem = async (id) => {
      await dispatch(deleteTodo({ id }));
      await dispatch(getTodoList());
   };

   const addTodoItem = async () => {
      if (description.length !== 0) {
         document.getElementById("addError").style.display = "none";
         await dispatch(createTodo({ description, completed }));
         await dispatch(getTodoList());
         toggleModal();
      } else {
         document.getElementById("addError").style.display = "flex";
      }
   };

   const toggleModal = () => {
      setModalOpen(!modalOpen);
      setDescription("");
      setCompleted(false);
      setId("");
   };

   return (
      <Container>
         <Row>
            <Col md="2"></Col>
            <Col>
               <Card size="large">
                  <FormTitle>Todo List!</FormTitle>
                  <Row>
                     <Col md="1"></Col>
                     <Col md="10" className="d-flex justify-content-center">
                        <AddButton
                           onClick={() => {
                              setAddModal(true);
                              toggleModal();
                           }}
                        >
                           Add Todo
                        </AddButton>
                     </Col>
                     <Col md="1"></Col>
                  </Row>

                  <TodoWrapper>
                     {todoList.length !== 0 ? (
                        todoList.map((item) => (
                           <TodoItem key={item.id} checked={item.completed}>
                              <TodoInfo>
                                 <TodoCheckBox
                                    type="checkbox"
                                    checked={item.completed}
                                    onChange={() => {
                                       setCompleted(!completed);
                                    }}
                                 ></TodoCheckBox>
                                 <TodoLabel>{item.description}</TodoLabel>
                              </TodoInfo>

                              <TodoActions>
                                 <EditButton
                                    primary
                                    onClick={() => {
                                       setAddModal(false);
                                       toggleModal();
                                       setId(item.id);
                                       setCompleted(item.completed);
                                       setDescription(item.description);
                                    }}
                                 >
                                    Edit
                                 </EditButton>
                                 <DeleteButton
                                    primary
                                    onClick={() => {
                                       deleteTodoItem(item.id);
                                    }}
                                 >
                                    Delete
                                 </DeleteButton>
                              </TodoActions>
                           </TodoItem>
                        ))
                     ) : (
                        <NoTodos>
                           No Todos? Are you working or just lazy? 🤨
                        </NoTodos>
                     )}
                  </TodoWrapper>
               </Card>
            </Col>
            <Col md="2"></Col>
         </Row>
         <Modal onHide={toggleModal} show={modalOpen}>
            <Modal.Header closeButton>
               <Modal.Title>Add Todo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <AddTodo>
                  <AddTodoLabel>Description</AddTodoLabel>
                  <AddTodoInput
                     type="text"
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                  ></AddTodoInput>
               </AddTodo>
               <AddTodo>
                  <AddTodoLabel>Completed</AddTodoLabel>
                  <Switch
                     onColor="#626ed4"
                     size="20px"
                     checked={completed}
                     onChange={() => {
                        setCompleted(!completed);
                     }}
                  />
               </AddTodo>
               <ErrorDisplay id="addError" style={{ display: "none" }}>
                  This field is required!
               </ErrorDisplay>
            </Modal.Body>
            <Modal.Footer>
               <Button onClick={toggleModal}>Close</Button>
               {addModal ? (
                  <Button onClick={addTodoItem}>Add</Button>
               ) : (
                  <Button onClick={updateTodoItem}>Update</Button>
               )}
            </Modal.Footer>
         </Modal>
      </Container>
   );
};
const mapStateToProps = (state) => {
   const { loading, success, error, todo } = state.getTodo;
   const { success: deleteSuccess } = state.deleteTodo;
   return {
      loading,
      success,
      error,
      todo,
      deleteSuccess,
   };
};
export default connect(mapStateToProps)(Todo);
