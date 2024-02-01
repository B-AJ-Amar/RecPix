import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "@/components/ui/button"
import ImageList from '@/components/Lists/ImgeList';

import { ThemeProvider } from "@/components/theme-provider"

import Nav from '@/components/Nav/Nav'

function App() {
  return (
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {/* <div></div> */}
        {/* <ImageList /> */}
        <Nav />
        <Button>Click me</Button>
        <h1 className=" text--foreground font-semibold">RecPix</h1>

    </ThemeProvider>
    </>
  )
}
 
export default App