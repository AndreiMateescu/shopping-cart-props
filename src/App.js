// import React from "react";
import { useState, useEffect } from "react";
import Employees from "./components/Employees/Employees";
import NewProducts from "./components/NewProducts/NewProducts";
import SignInGoogle from "./components/SignIn/SignInGoogle";
import firebase from "./service/firebase";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import NoPage from "./components/NoPage/NoPage";
import NavBar from "./components/NavBar/NavBar";

function App() {
  const [user, setUser] = useState(null);
  const [shoppingCartProducts, setShoppingCartProducts] = useState([]);
  const [countCartItems, setCountCartItems] = useState(0);
  console.log(countCartItems);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Home user={user}></Home>
            ) : (
              <SignInGoogle>
                <NavBar countCartItems={countCartItems} />
              </SignInGoogle>
            )
          }
        />
        <Route
          path="Home"
          element={user ? <Home user={user} /> : <SignInGoogle />}
        />
        <Route
          path="/SignIn"
          element={
            user ? (
              <Navigate to={{ pathname: "/Home", state: { user: user } }} />
            ) : (
              <SignInGoogle>
                <NavBar countCartItems={countCartItems} />
              </SignInGoogle>
            )
          }
        />
        <Route
          path="Employees"
          element={
            user ? (
              <Employees>
                <NavBar countCartItems={countCartItems} />
              </Employees>
            ) : (
              <SignInGoogle />
            )
          }
        />
        <Route
          path="Products"
          element={
            user ? (
              <NewProducts
                shoppingCartProducts={shoppingCartProducts}
                setShoppingCartProducts={setShoppingCartProducts}
                countCartItems={countCartItems}
                setCountCartItems={setCountCartItems}
              >
                <NavBar countCartItems={countCartItems} />
              </NewProducts>
            ) : (
              <SignInGoogle />
            )
          }
        />
        <Route
          path="ShoppingCart"
          element={
            user ? (
              <ShoppingCart shoppingCartProducts={shoppingCartProducts}>
                <NavBar countCartItems={countCartItems} />
              </ShoppingCart>
            ) : (
              <SignInGoogle />
            )
          }
        />
        <Route
          path="*"
          element={
            <NoPage>
              <NavBar countCartItems={countCartItems} />
            </NoPage>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
