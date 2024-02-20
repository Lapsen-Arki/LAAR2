import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Page component imports:
import IndexPage from "./views";
import TestingPage from "./views/oldPages/testingPage";
import Register from "./views/Auth/Register";
import Login from "./views/Auth/Login";
import Profile from "./views/Profile";
import EditProfile from "./views/editProfile";
import CaresProfile from "./views/carersProfile";
import AdminPage from "./views/Auth/admin";
import SubscriptionManagement from "./views/SubscriptionManagement";
import AccountSettingsPage from "./views/accountSettings";
import ChoicesPage from "./views/choices";
import TermsAndPrivacy from "./views/termsAndPrivacy";
import AboutUs from "./views/aboutUs";
import Results from "./views/results";

// Higher Order Components (HOC):
import Layout from "./components/Layout/Layout";
import { Elements } from "@stripe/react-stripe-js";
import { TokenProvider } from "./contexts/tokenContext";
import { UserProvider } from "./contexts/userContext";

// Configs etc
import "./conf/firebaseSdkConfig";
import { loadStripe } from "@stripe/stripe-js";
// Stripe Publishable testing key:
// Production version needs: 1. HTTPS connection and 2. pk_live live key
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLIC_KEY ||
    "pk_test_51HqdGcK45umi2LZdJtYVobHqBd8GGJjr0ggqdhGTRNisO9fdkOdHIXc1kH96Tpex7dYyj9VlIEGTv90hiMExVn2S00w1xYoflk"
).catch((error) => {
  console.error("Error loading Stripe in app.tsx: ", error);
  return null;
});

function App() {
  return (
    <Router>
      <TokenProvider>
        <UserProvider>
          <Elements stripe={stripePromise}>
            <Layout>
              <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/choices" element={<ChoicesPage />} />
                <Route path="/results" element={<Results />} />
                <Route path="/testing" element={<TestingPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile-edit/:id?" element={<EditProfile />} />
                <Route path="/profile-share" element={<CaresProfile />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/subscription" element={<SubscriptionManagement />} />
                <Route path="/account" element={<AccountSettingsPage />} />
                <Route path="/terms" element={<TermsAndPrivacy />} />
                <Route path="/about-us" element={<AboutUs />} />
              </Routes>
            </Layout>
          </Elements>
        </UserProvider>
      </TokenProvider>
    </Router>
  );
}

export default App;
