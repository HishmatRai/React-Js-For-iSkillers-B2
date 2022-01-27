import React from "react";
import { Link, useNavigate } from "react-router-dom";
let Contact = () => {
    let navigate = useNavigate();
    return (
        <div>
            <h1>Contact Page</h1>
            <button onClick={() => navigate('/')}>
                Home
            </button>
            <button onClick={() => navigate("/Contact")}>Contact</button>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/Contact">
                        Contact
                    </Link>
                </li>
            </ul>
        </div>
    )
}
export default Contact