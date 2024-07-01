import { Route, Routes ,  Navigate} from "react-router-dom";
import "./App.css";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Register from "./pages/register/register";


const ProtectedRoute = ({ children }) => {


  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" />;
  }

  return children;
};
function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={
            <ProtectedRoute><Routes><Route path="/" element={<Home />} /></Routes></ProtectedRoute> 
            } />
        </Routes>
      </div>
    </>
  );
}

export default App;
