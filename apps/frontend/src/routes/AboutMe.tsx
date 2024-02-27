//import React, { useEffect, useState } from "react";

import AboutCard from "../components/AboutCard.tsx";

const AboutMe = () => {
  return (
    <div className="about-the-team" style={{ width: "75%" }}>
      <h2 style={{ textAlign: "center" }}>Our Team</h2>

      <div className="team-members-flex">
        <div
          style={{ display: "flex", flexDirection: "row", paddingTop: "20px" }}
        >
          <AboutCard
            Name={"Ajay"}
            role={"Team Lead"}
            devrole={"FullStack Engineer"}
            ClassYear={"Sophmore"}
            Major={"Computer Science"}
            Email={"asdf@wpi.edu"}
            Github={"google.com"}
            Linkdin={"asdf.com"}
            Imagepath={"NULL"}
          />

          <div className="team-member" style={{ flexGrow: "1" }}>
            <h3>mem2</h3>
            <p>Softeng</p>
            <p>biotest</p>
          </div>
          <div className="team-member" style={{ flexGrow: "1" }}>
            <h3>mem3</h3>
            <p>Softeng</p>
            <p>biotest</p>
          </div>
          <div className="team-member" style={{ flexGrow: "1" }}>
            <h3> mem4</h3>
            <p>Softeng</p>
            <p>biotest</p>
          </div>
          <div className="team-member">
            <h3>mem5</h3>
            <p>Softeng</p>
            <p>biotest</p>
          </div>
        </div>

        <div className="team-member">
          <h3>mem6</h3>
          <p>Softeng</p>
          <p>biotest</p>
        </div>

        <div className="team-member">
          <h3>mem7</h3>
          <p>Softeng</p>
          <p>biotest</p>
        </div>
      </div>
    </div>
  );
};
export default AboutMe;
