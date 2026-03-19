
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>

             <Route path="/employees" element={<ProtectedRoute><Employees/></ProtectedRoute>}/>
        
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
   
        <Route path="/projects" element={<ProtectedRoute><Projects/></ProtectedRoute>}/>
        <Route path="/tasks" element={<ProtectedRoute><Tasks/></ProtectedRoute>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;