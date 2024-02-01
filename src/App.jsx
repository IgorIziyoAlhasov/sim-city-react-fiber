import React, { useState } from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { NavigationPanel } from './components';
import './styles/main.scss'
import { Home } from './pages';
// import { ToolBar } from './components';


const App = () => {
    const [activeTool, setActiveTool] = useState(null);
    return (
        <main>
            <Router>
                <NavigationPanel />
                <Routes>
                    <Route path='/' element={<Home activeTool={activeTool} />} />
                    <Route path='./contact' element={'Contact'} />
                </Routes>
            </Router>
            {/* <ToolBar setActiveTool={setActiveTool} /> */}
        </main>
    )
}

export default App