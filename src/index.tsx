import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Blog from "./Pages/Blog";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Components/Auth/Login";
import Register from './Components/Auth/Register';
import Category from "./Pages/Category";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Blog/>}/>
                <Route path="/:postId" element={<Blog/>}/>
                <Route path="/category/:category/:categoryId" element={<Category/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
