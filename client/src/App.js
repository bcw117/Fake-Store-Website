import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Cart } from "./pages/Cart";
import { MenStore } from "./pages/Mens";
import { WomenStore } from "./pages/Womens";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Footer } from "./components/Footer";
import { UserContextProvider } from "./context/UserContext";
import { Product } from "./pages/Product";
import { Electronics } from "./pages/Electronics";
import { Jewelry } from "./pages/Jewelry";
import { Account } from "./pages/Account";
import { ShopContextProvider } from "./context/ShopContext";

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <ShopContextProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/mens" element={<MenStore />} />
              <Route path="/womens" element={<WomenStore />} />
              <Route path="/electronics" element={<Electronics />} />
              <Route path="/jewelry" element={<Jewelry />} />
              <Route path="/product" element={<Product />}>
                <Route path=":productId" element={<Product />} />
              </Route>
              <Route path="/cart" element={<Cart />} />
              <Route path="/account" element={<Account />} />
            </Routes>
            <Footer />
          </Router>
        </ShopContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
