
import Nav from '@/components/Nav/Nav'

// pages
import About from "@/components/pages/about";
import { AuthCard } from "./components/pages/auth";

import { Navigate, Route, Routes } from "react-router-dom"
// import {useState, createContext} from "react";
import { useAuth } from "./contexts/AuthContext";
import {postData} from "./temp"

import HomePage from "@/components/pages/home";
import TrendingPage from './components/pages/trending';
import ExplorePage from './components/pages/explore';
import SavedPage from './components/pages/saved';
import ProfilePage from './components/pages/profile';
function App() {
  const { user, isAuthenticated } = useAuth();
  console.log(isAuthenticated);

  return (
    <>
      <Routes>
        <Route path="/auth" element={  (isAuthenticated)? <Navigate to="/" />: <AuthCard />  } />
        <Route path="/" element={ (isAuthenticated)? <Nav /> : <Navigate to="/auth" /> } >
          <Route index element={<HomePage posts={postData} />} />
          <Route path="/explore" element={<ExplorePage  />} />
          <Route path="/trending" element={<TrendingPage  />} />
          <Route path="/saved" element={<SavedPage  />} />
          <Route path="/profile" element={<ProfilePage  />} />
        </Route>
        <Route path="/about" element={<About />} /> 
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  )
}
 
export default App