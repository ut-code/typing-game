import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./pages"
import Basic from "./pages/Basic"
import Result from "./pages/Result"
import KeyboardLayoutCreatorHome from "./pages/KeyboardLayoutCreator/Home"
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/basic" element={<Basic />}></Route>
        <Route path="/result" element={<Result />}></Route>
        <Route path="/keyboard-layout-creator" element={<KeyboardLayoutCreatorHome />}></Route>
      </Routes>
    </>
  )
}
