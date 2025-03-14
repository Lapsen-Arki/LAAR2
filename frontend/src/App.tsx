import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Page component imports:
import IndexPage from "./views";
import Register from "./views/Auth/Register";
import Login from "./views/Auth/Login";
import Profile from "./views/Profile";
import EditProfile from "./views/editProfile";
import CaresProfile from "./views/carersProfile";
import AdminPage from "./views/Auth/AdminPage";
import SubscriptionManagement from "./views/SubscriptionManagement";
import AccountSettingsPage from "./views/accountSettings";
import ChoicesPage from "./views/choices";
import Results from "./views/results";
import ShoppingList from "./views/shoppingList";
import NoteBook from "./views/noteBook";

// Higher Order Components (HOC):
import Layout from "./components/Layout/Layout";
import { Elements } from "@stripe/react-stripe-js";
import { TokenProvider } from "./contexts/tokenContext";
import { UserProvider } from "./contexts/userContext";
import { ThemeProvider } from "@emotion/react";
import { globalTheme } from "./styles/globalTheme";
import "./styles/globals.css";

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
          <ThemeProvider theme={globalTheme}>
            <Elements stripe={stripePromise}>
              {/* Layoout includes: 1. Header, 2. Footer, 3. Chat robot, 4. Scroll up button */}
              <Layout>
                <Routes>
                  <Route path="/" element={<IndexPage />} />
                  <Route path="/choices" element={<ChoicesPage />} />
                  <Route path="/results" element={<Results />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/profile-edit/:id?" element={<EditProfile />} />
                  <Route path="/profile-share" element={<CaresProfile />} />
                  <Route path="/admin" element={<AdminPage />} />
                  <Route
                    path="/subscription"
                    element={<SubscriptionManagement />}
                  />
                  <Route path="/account" element={<AccountSettingsPage />} />
                  <Route path="/shopping-list" element={<ShoppingList />} />
                  <Route path="/notebook" element={<NoteBook />} />
                </Routes>
              </Layout>
            </Elements>
          </ThemeProvider>
        </UserProvider>
      </TokenProvider>
    </Router>
  );
}

export default App;
