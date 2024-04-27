import React from "react";

import { Link } from "react-router-dom";

const AboutPage: React.FC = () => {
  return (
    <>
      <Link to={"/"}>To Home Page</Link>
      <p>This is the content of the aboutpage.</p>
    </>
  );
};

export default AboutPage;