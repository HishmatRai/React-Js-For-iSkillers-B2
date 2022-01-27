import React from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import { Home, Contact } from './../../pages'
let RouterNavigation = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Contact" element={<Contact />} />
            </Routes>
        </BrowserRouter>
    )
}
export default RouterNavigation