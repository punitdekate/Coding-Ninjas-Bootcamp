import "./styles.css";
import { Component } from "react";
import Navbar from "./Navbar.js";
import Hero from "./Hero.js";
import About from "./About.js";

export default function App() {
  return (
    <div className='App'>
      <Navbar />
      <Hero />
      <About />
    </div>
  );
}
