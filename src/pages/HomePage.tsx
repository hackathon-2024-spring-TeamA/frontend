import React from "react";

import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <>
      <Link to={"about"}>To About Page</Link>
      <p>This is the content of the homepage.</p>
    </>
  );
};

export default HomePage;
