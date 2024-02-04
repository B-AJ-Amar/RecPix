
import Nav from '@/components/Nav/Nav'
import ImageList from '@/components/Lists/ImgeList';

// pages
import About from "@/components/pages/about";
import { AuthCard } from "./components/pages/auth";

import { Navigate, Route, Routes } from "react-router-dom"
// import {useState, createContext} from "react";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { user, isAuthenticated, login, logout } = useAuth();
  console.log(isAuthenticated);
  return (
    <>
      <Routes>
        <Route path="/auth" element={  (isAuthenticated)? <Navigate to="/" />: <AuthCard />  } />
        <Route path="/" element={ (isAuthenticated)? <Nav /> : <Navigate to="/auth" /> } >
          <Route index element={<ImageList />} />
        </Route>
        <Route path="/about" element={<About />} /> 
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  )
}
 
export default App