import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Layout from "./components/Layout/Layout";
import Register from "./views/Auth/Register";
import Login from "./views/Auth/Login";
import Profile from "./views/Profile";
import EditProfile from "./views/editProfile";
import CaresProfile from "./views/carersProfile";
import ProfileDemo from "./views/ProfileDemo";
import Meals from "./views/Meals";
import TimeBlocking from "./views/TimeBlocking";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import AdminPage from "./views/Auth/admin";
import Subscription from "./views/Subscription";
import "./conf/firebaseSdkConfig";
import { TokenProvider } from "./contexts/tokenContext";

import Example from "./views/example";

// Stripe Publishable testing key:
// Production version needs: 1. HTTPS connection and 2. pk_live live key
const stripePromise = loadStripe(
  "pk_test_51HqdGcK45umi2LZdJtYVobHqBd8GGJjr0ggqdhGTRNisO9fdkOdHIXc1kH96Tpex7dYyj9VlIEGTv90hiMExVn2S00w1xYoflk"
).catch((error) => {
  console.error("Error loading Stripe in app.tsx: ", error);
  return null;
});

function App() {
  return (
    <Router>
      <TokenProvider>
        <Elements stripe={stripePromise}>
          <Layout>
            <Routes>
              <Route path="/example" element={<Example />} />

              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile-edit/:id?" element={<EditProfile />} />
              <Route path="/profile-share" element={<CaresProfile />} />
              <Route path="/profile-demo" element={<ProfileDemo />} />
              <Route path="/meals" element={<Meals />} />
              <Route path="/timeblocking" element={<TimeBlocking />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/subscription" element={<Subscription />} />
            </Routes>
          </Layout>
        </Elements>
      </TokenProvider>
    </Router>
  );
}

export default App;
