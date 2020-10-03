import React, { useState } from 'react'
import TodoService from '../services/TodoService'

const AddTodo = () => {
    const initialTodoState = {
        id: null,
        title: "",
        completed: false
      };

      const [todoList, setTodoList] = useState(initialTodoState);
      const [submitted, setSubmitted] = useState(false);


      const handleInputChange = event => {
        const { name, value } = event.target;
        setTodoList({ ...todoList, [name]: value });
      };

      const saveTodoList = () => {
        var data = {
          title: todoList.title,
          completed: todoList.completed
        };

        TodoService.create(data)
            .then(response => {
                setTodoList({
                id: response.data.id,
                title: response.data.title,
                completed: response.data.completed
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };
    const newTodo = () => {
        setTodoList(initialTodoState);
        setSubmitted(false);
      };

    const toggleBool = () => {
        
    };

    return (
        <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTodo}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={todoList.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="radio"
              className="form-control"
              id="completed"
              required
              value={todoList.completed}
              onClick={toggleBool}
              name="completed"
            />
          </div>

          <button onClick={saveTodoList} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTodo;
