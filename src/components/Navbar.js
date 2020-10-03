import React, { Component } from 'react';

import { Link } from "react-router-dom";

class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <a href="/" className="navbar-brand">
                        my-axios-api
                    </a>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/todo-list"} className="nav-link">
                                Todo-List
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/add-todo"} className="nav-link">
                                Add-todo
                            </Link>
                        </li>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;