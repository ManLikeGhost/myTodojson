import React, { useState, useEffect } from 'react'
import TodoService from '../services/TodoService'
import { Link } from "react-router-dom";


const TodoList = () => {
        const [todoLists, setTodoLists] = useState([]);
        const [currentTodo, setcurrentTodo] = useState(null);
        const [currentIndex, setCurrentIndex] = useState(-1);
        const [searchTitle, setSearchTitle] = useState("");

        useEffect(() => {
            retrieveTodoLists();
          }, []);

          const onChangeSearchTitle = e => {
            const searchTitle = e.target.value;
            setSearchTitle(searchTitle);
          };
        
          const retrieveTodoLists = () => {
            TodoService.getAll()
              .then(response => {
                setTodoLists(response.data);
                console.log(response.data);
              })
              .catch(e => {
                console.log(e);
              });
          };
        
          const refreshList = () => {
            retrieveTodoLists();
            setcurrentTodo(null);
            setCurrentIndex(-1);
          };
        
          const setActivetodo = (todo, index) => {
            setcurrentTodo(todo);
            setCurrentIndex(index);
          };
        
          const removeAllTodoLists = () => {
            TodoService.removeAll()
              .then(response => {
                console.log(response.data);
                refreshList();
              })
              .catch(e => {
                console.log(e);
              });
          };
        
          const findByTitle = () => {
            TodoService.findByTitle(searchTitle)
              .then(response => {
                setTodoLists(response.data);
                console.log(response.data);
              })
              .catch(e => {
                console.log(e);
              });
          };


    return (
        <div className="list row">
        <div className="col-md-8">
            <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Search by title"
                value={searchTitle}
                onChange={onChangeSearchTitle}
            />
            <div className="input-group-append">
                <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={findByTitle}
                >
                Search
                </button>
            </div>
            </div>
        </div>
        <div className="col-md-6">
            <h4>Todo List</h4>

            <ul className="list-group">
            {todoLists &&
                todoLists.map((todo, index) => (
                <li
                    className={
                    "list-group-item " + (index === currentIndex ? "active" : "")
                    }
                    onClick={() => setActivetodo(todo, index)}
                    key={index}
                >
                    {todo.title}
                </li>
                ))}
            </ul>

            <button
            className="m-3 btn btn-sm btn-danger"
            onClick={removeAllTodoLists}
            >
            Remove All
            </button>
        </div>
        <div className="col-md-6">
            {currentTodo ? (
            <div>
                <h4>todo</h4>
                <div>
                <label>
                    <strong>Title:</strong>
                </label>{" "}
                {currentTodo.title}
                </div>
                <div>
                <label>
                    <strong>Status:</strong>
                </label>{" "}
                {currentTodo.completed ? "completed" : "Pending"}
                </div>

                <Link
                to={"/todo-list/" + currentTodo.id}
                className="badge badge-warning"
                >
                Edit
                </Link>
            </div>
            ) : (
            <div>
                <br />
                <p>Please click on a todo...</p>
            </div>
            )}
        </div>
    </div>
    )
}

export default TodoList;