import { BrowserRouter as Router, Route,Routes, Navigate} from 'react-router-dom';
import Content from './components/content';
import Login from "./components/login"
import Signup from "./components/signup"
import useAuthContext from "./context/useAuthContext";

export default function App(){
  const {user}=useAuthContext()
  return(
      <Router>
        <Routes>
          <Route>
            <Route path="/TM" element={user?<Content/>:<Navigate to="/TM/login"/>}></Route>          
            <Route path="/TM/login" element={!user?<Login/>:<Navigate to="/TM/"/>}></Route>
            <Route path="/TM/signup" element={!user?<Signup/>:<Navigate to="/TM/"/>}></Route>
          </Route>
          <Route path="/" element={<Navigate to="/TM/"/>}></Route>
        
        </Routes>
      </Router>
  )
}