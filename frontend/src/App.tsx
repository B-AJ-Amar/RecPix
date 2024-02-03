import { ThemeProvider } from "@/components/theme-provider"

import Nav from '@/components/Nav/Nav'
import ImageList from '@/components/Lists/ImgeList';

// pages
import About from "@/components/pages/about";
import { AuthCard } from "./components/pages/auth";

import { Route, Routes } from "react-router-dom"
import {useState, createContext} from "react";

const isAuthenticated = createContext(false);
function App() {
  return (
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/auth" element={
          <>
            <AuthCard />
          </>
        } />
        <Route path="/" element={
          <>
          
            <Nav />
            <ImageList />
          </>
        } />
        <Route path="/about" element={<About />} /> 


      </Routes>
    </ThemeProvider>
    </>
  )
}
 
export default App