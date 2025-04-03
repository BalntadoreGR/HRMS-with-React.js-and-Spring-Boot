import { Fragment } from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Appbar from "./components/Layout/AppBar/Appbar";
import EmployeesMain from './components/pages/Employee/EmployeesMain';
import ProjectsMain from "./components/pages/Project/ProjectsMain";
import Home from './components/pages/Home/Home';
import Sdlc from './components/pages/Sdlc/Sdlc';
import Dashboard from "./components/pages/Dashboard/Dashboard";

function App() {
  return (
    <Router>        
        <Routes>                    
          <Route path='/projects' element={<ProjectsMain />} />
          <Route path='/employees' element={<EmployeesMain />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/home' element={<Home/>} />
          <Route path="/sdlc" element={<Sdlc/>} />
          <Route path="*" element={<Home/>} />
        </Routes>
    </Router>
  );
}

export default App;
