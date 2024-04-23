import React from "react";
import "../App.css";

import { Link } from "react-router-dom";

import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

const About: React.FC = () => {
  return (
    <div className="About">
      <Header />
      <main style={{ padding: "20px" }}>
        <Link to={"/"}>To Home Page</Link>
        <p>This is the content of the aboutpage.</p>
      </main>
      <Footer />
    </div>
  );
};

export default About;
