import React from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { NavigationPanel } from './components';
import './styles/main.scss'
import { Home } from './pages';
import { ToolBar } from './components';


const App = () => {
    ToolBar
    return (
        <main>
            <Router>
                <NavigationPanel />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='./contact' element={'Contact'} />
                </Routes>
            </Router>
            <ToolBar />
        </main>
    )
}

export default App