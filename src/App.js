import React, {useState, createContext} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './pages/Layout'
import Auth from './pages/Auth'
import Todo from './pages/Todo'
import NoPage from './pages/NoPage'

export const ColorContext = createContext();
const hostname = window.location.hostname;

const App = () => {
    const [color, changeColor] = useState("rgba(12, 12, 53, 0.911)");
    document.title = hostname;

    return (
    <div id='master' style={{background: color}}>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout/>}>

                    <Route index element={
                            <ColorContext.Provider value={changeColor}>
                                <Auth 
                                changeColor={changeColor}/>
                            </ColorContext.Provider>
                    }/>

                    <Route path='task-manager' element={
                            <ColorContext.Provider value={changeColor}>
                                <Todo 
                                changeColor={changeColor}/>
                            </ColorContext.Provider>}/>

                    <Route path='*' element={<NoPage/>}/>

                </Route>
            </Routes>
        </BrowserRouter>
    </div>
    )
}

export default App
