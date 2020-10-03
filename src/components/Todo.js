import React, { useState, useEffect } from 'react'
import TodoService from "../services/TodoService";

const Todo = props => {
    const initialTodoState = {
        id: null,
        title: "",
        completed: false
      };
      const [currentTodo, setCurrentTodo] = useState(initialTodoState);
      const [message, setMessage] = useState("");
    
      const getTodo = id => {
        TodoService.get(id)
          .then(response => {
            setCurrentTodo(response.data);
            console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };
  
    useEffect(() => {
        getTodo(props.match.params.id);
    }, [props.match.params.id]);
  
    const handleInputChange = event => {
      const { name, value } = event.target;
      setCurrentTodo({ ...currentTodo, [name]: value });
    };
  
    const updatePublished = status => {
      var data = {
        id: currentTodo.id,
        title: currentTodo.title,
       completed: status
      };
  
      TodoService.update(currentTodo.id, data)
        .then(response => {
          setCurrentTodo({ ...currentTodo, published: status });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };
  
    const updateTodo = () => {
      TodoService.update(currentTodo.id, currentTodo)
        .then(response => {
          console.log(response.data);
          setMessage("The todo list was updated successfully!");
        })
        .catch(e => {
          console.log(e);
        });
    };
  
    const deleteTodo = () => {
      TodoService.remove(currentTodo.id)
        .then(response => {
          console.log(response.data);
          props.history.push("/todo-list");
        })
        .catch(e => {
          console.log(e);
        });
    };

    return (
        <div>
      {currentTodo ? (
        <div className="edit-form">
          <h4>Tutorial</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentTodo.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentTodo.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentTodo.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentTodo.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteTodo}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateTodo}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
    )
}

export default Todo;

