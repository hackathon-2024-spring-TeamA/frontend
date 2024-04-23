import React from "react";
import "../App.css";

import { Link } from "react-router-dom";

import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

const Home: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <main style={{ padding: "20px" }}>
        <Link to={"about"}>To About Page</Link>
        <p>This is the content of the homepage.</p>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
