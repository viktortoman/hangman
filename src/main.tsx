import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router-dom";

import './index.css'

import LandingPage from './pages/LandingPage';
import GamePage from './pages/GamePage';
import {ToastContainer} from "react-toastify";
import InstructionsPage from "./pages/InstructionsPage.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/game" element={<GamePage/>}/>
                <Route path="/instructions" element={<InstructionsPage/>}/>
            </Routes>
            <ToastContainer/>
        </BrowserRouter>
    </StrictMode>,
)
