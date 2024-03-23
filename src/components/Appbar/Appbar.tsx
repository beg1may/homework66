import React from 'react';
import {NavLink} from "react-router-dom";

const Appbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <span className="navbar-brand">Calories Tracker</span>
                <ul className="navbar-nav mr-auto flex-row flex-nowrap gap-3">
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/new-meal" className="nav-link">Add new Meal</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Appbar;