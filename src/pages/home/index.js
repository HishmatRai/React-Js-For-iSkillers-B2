import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Firebase from './../../config/firebase';
let Home = () => {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [message, setMessage] = useState("")
    let navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    const auth = getAuth();


    let SignUpHandler = () => {
        if (email === "") {
            alert("email required!")
        } else if (password === "") {
            alert("password requried!")
        } else {
            let userObj = {
                email: email,
                password: password
            }
            createUserWithEmailAndPassword(auth, userObj.email, userObj.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log("Signed", user);
                    setMessage("Signed in with email and password")
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    console.log(errorMessage);
                    setMessage(errorMessage)
                });
        }
    }


    let GoogelSignInHandler = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const user = result.user;
                console.log(user);
                setMessage("Signed in with Google")
            }).catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
                setMessage(errorMessage)
            });
    }
    return (
        <div>
            <h1>Home Page</h1>
            <button onClick={() => navigate('/')}>
                Home
            </button>
            <button onClick={() => navigate("/Contact")}>Contact</button>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/Contact">Contact</Link>
                </li>
            </ul>

            <input type="email" placeholder='email' value={email} onChange={(email) => setEmail(email.target.value)} />
            <input type="password" placeholder='password' value={password} onChange={(password) => setPassword(password.target.value)} />
            <button onClick={SignUpHandler}>Sign Up</button>
            <button onClick={GoogelSignInHandler}>Sign In With Google</button>
            <p>{message}</p>
        </div>
    )
}
export default Home;