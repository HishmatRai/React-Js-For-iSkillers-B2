import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import Firebase from './../../config/firebase';
import Button from './../../components/button'
let Home = () => {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [message, setMessage] = useState("")
    let [seleceted, setSelected] = useState(0);
    let [showForm, setShowForm] = useState(false)
    let [addData, setAddData] = useState(false)


    let navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    const auth = getAuth();


    console.log("seleceted", seleceted)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setMessage("signed in")
            } else {
                setMessage("Log Out")
            }
        });
    }, [])
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

    let UserData = [
        {
            name: "iSkillers",
            email: "info@gmail.com",
            mobNum: "03232322323",
            show: false,
            bgColor: "red",
            borderRadius: "20px"

        },
        {
            name: "iSkillers Academy",
            email: "info@iskillers.com",
            mobNum: "",
            show: true,
            bgColor: "green",
            borderRadius: "40px"
        },
        {
            name: "iSkillers Academy",
            email: "info@iskillers.com",
            mobNum: "",
            show: true,
            bgColor: "blue",
            borderRadius: "80px"
        },
    ]

    console.log("password value", password.length)
    return (
        <div>
            <h1>Home Page</h1>
            <Button
                ButtonTitle="Button 01"
                bgColor="red"
                ButtonTextColor="green"
                ButtonHeight="50px"
                ButtonWidth="350px"
                CustomWidth={true}
            />
            <br />
            <br />
            <Button
                ButtonTitle="Button 02"
                bgColor="green"
                ButtonTextColor="red"
                ButtonHeight="80px"
                ButtonWidth="300px"
                CustomWidth={true}
            />
            <br />
            <br />
            <Button
                ButtonTitle="Button 02"
                bgColor="green"
                ButtonTextColor="red"
                ButtonHeight="80px"
            />
            <br />
            <br />
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
            <input type="password" placeholder='password' value={password} onChange={(password) => setPassword(password.target.value)} /> {password.length >= 6 ? <span style={{ color: "green" }}>Password</span> : <span style={{ color: "red" }}>Password</span>}
            <button onClick={SignUpHandler}>Sign Up</button>
            <button onClick={GoogelSignInHandler}>Sign In With Google</button>
            <p>{message}</p>

            {UserData.map((v, i) => {
                return (
                    <div style={{ backgroundColor: v.bgColor, borderRadius: v.borderRadius }} key={i}>
                        {v.show && <h1 >Name : {v.name}</h1>}
                        {/* <h1 style={{ backgroundColor: "green" }}>Name : {v.name}</h1> */}
                        <h1>Email : {v.email}</h1>
                        {v.mobNum === "" ? null : <h1>Mobile Number : {v.mobNum}</h1>}
                        {/* {v.mobNum !== "" ? <h1 style={{ color: "red" }}>Mobile Number : {v.mobNum}</h1> : null} */}
                        <button style={{ backgroundColor: seleceted === i ? "yellow" : "white", width: "100px", height: "50px" }} onClick={() => setSelected(i)}>click</button>
                    </div>
                )
            })}
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            {showForm ?
                <button onClick={() => setShowForm(false)}>Delete Account</button> :
                <button onClick={() => setShowForm(true)}>Create Account</button>
            }
            <br />
            <br />
            {showForm &&
                <>
                    <input type="text" />
                    <input type="text" />
                    <input type="text" />
                </>
            }
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />


            <button onClick={() => setAddData(!addData)}>Add Data</button>
            {addData && <h1>iSkilles</h1>}

        </div>
    )
}
export default Home;

// if(1 === 1 ){

// }else{

// }