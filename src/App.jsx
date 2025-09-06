// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import { Auth } from './components/auth.jsx'

// function App() {

//   return (
//     <div><Auth /></div>
//   )
// }

// export default App

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";
// Pages
import Login from "./pages/login";
import Signup from "./pages/signup";
import Feed from "./pages/Feed";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/feed" /> : <Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/feed" element={user ? <Feed /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
