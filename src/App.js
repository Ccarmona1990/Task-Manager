import React, {useState, createContext} from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Layout from './pages/Layout'
import Auth from './pages/Auth'
import Login from './utils/Login-v1'
import Reg from './utils/RegistrationV1'
import Todo from './pages/Todo'
import NoPage from './pages/NoPage'
import taskImg from './images/tasksImg.jpg'


export const ColorContext = createContext();
const hostname = window.location.hostname;

const App = () => {
    const [color, changeColor] = useState("#fff");
    //rgba(12, 12, 53, 0.911)
    document.title = hostname;

    return (
    <div id='master'
    //style={{background: color}}
    className="img js-fullheight"
    style={{backgroundImage: `url(${taskImg})`, backgroundSize: 'cover'}}>
        <BrowserRouter>
            <Routes>
                
                <Route 
                exact path='/' 
                element={
                    <ColorContext.Provider value={changeColor}>
                        <Login
                        changeColor={changeColor}/>
                    </ColorContext.Provider>
                }/>

                <Route path='/signup' 
                element={
                    <ColorContext.Provider value={changeColor}>
                        <Reg
                        changeColor={changeColor}/>
                    </ColorContext.Provider>
                }/>

                <Route 
                path='task-manager' 
                element={
                    <ColorContext.Provider value={changeColor}>
                        <Todo 
                        changeColor={changeColor}/>
                    </ColorContext.Provider>}/>

                <Route 
                path='*'
                element={<NoPage/>}/>

            </Routes>
        </BrowserRouter>
    </div>
    )
}

export default App
