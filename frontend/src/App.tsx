
import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext";
import {postData} from "./temp"
import Loading from "@/components/loading/loading"

// Q: replase all the import wth lazy import?


// pages
const Nav = lazy(() => import('@/components/Nav/Nav'));
const HomePage = lazy(() => import("@/components/pages/home"));
const TrendingPage = lazy(() => import('./components/pages/trending'));
const ExplorePage = lazy(() => import('./components/pages/explore'));
const SavedPage = lazy(() => import('./components/pages/saved'));
const ProfilePage = lazy(() => import('./components/pages/profile'));
const AuthCard = lazy(() => import('@/components/pages/auth'));
const About = lazy(() => import('@/components/pages/about'));


function App() {
  const { user, isAuthenticated } = useAuth();
  console.log(isAuthenticated);  
  return (
    <>
      <Routes>
        <Route path="/auth" element={  (isAuthenticated)? <Navigate to="/" />: <Suspense fallback={<Loading />} ><AuthCard /></Suspense>} />
        <Route path="/" element={ (isAuthenticated)? <Nav /> : <Navigate to="/auth" /> } >
          <Route index element={<HomePage posts={postData} />} />
          <Route path="/explore"  element={<Suspense fallback={<Loading />} > <ExplorePage  /></Suspense>} />
          <Route path="/trending" element={<Suspense fallback={<Loading />} > <TrendingPage  /></Suspense>} />
          <Route path="/saved"    element={<Suspense fallback={<Loading />} > <SavedPage  /></Suspense>} />
          <Route path="/profile"  element={<Suspense fallback={<Loading />} > <ProfilePage  /></Suspense>} />
        </Route>
        <Route path="/about" element={<About />} /> 
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  )
}
 
export default App