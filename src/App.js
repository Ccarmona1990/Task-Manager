import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './pages/Layout'
import Auth from './pages/Auth'
import Todo from './pages/Todo'
import NoPage from './pages/NoPage'

const App = () => {
    return (
        <BrowserRouter >
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route index element={<Auth/> }/>
                    <Route path='task-manager' element={<Todo/>}/>
                    <Route path='*' element={<NoPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
