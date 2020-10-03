import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import { Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar"
import AddTodo from "./components/AddTodo"
import Home from "./components/Home"
import Todo from "./components/Todo"
import TodoList from "./components/TodoList"

function App() {
  return (
    <div className="App">
      <Navbar />
      <div>
        <Switch>
        <Route exact path= "/">
            <Home />
          </Route>

          <Route exact path= "/todo-list">
            <TodoList />
          </Route>

          <Route exact path= "/add-todo">
            <AddTodo />
          </Route>

          <Route exact path= "/todo-item/:id">
            <Todo />
          </Route>
        </Switch>
      </div>  
    </div>
  );
}

export default App;
