import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Layout from "./components/Layout/Layout";
import Register from "./views/Auth/Register";
import Login from "./views/Auth/Login";
import Profile from "./views/Profile";
import EditProfile from "./views/editProfile";
import ProfileDemo from "./views/ProfileDemo";
import Meals from "./views/Meals";
import TimeBlocking from "./views/TimeBlocking";


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile-edit" element={<EditProfile />} />
          <Route path="/profile-demo" element={<ProfileDemo />} />
          <Route path="/meals" element={<Meals />} />
          <Route path="/timeblocking" element={<TimeBlocking />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
