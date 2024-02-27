//import React, { useEffect, useState } from "react";

import AboutCard from "../components/AboutCard.tsx";

const AboutMe = () => {
  return (
    <div
      className="about-the-team"
      style={{
        width: "75%",
        paddingTop: "20px",
        paddingBottom: "10px",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Our Team</h1>

      <div className="team-members-flex">
        <div
          style={{ display: "flex", flexDirection: "row", paddingTop: "20px" }}
        >
          <AboutCard
            Name={"Ajay"}
            role={"Team Lead"}
            devrole={"FullStack Engineer"}
            ClassYear={"2026"}
            Major={"Computer Science"}
            Email={"asdf@wpi.edu"}
            Github={"google.com"}
            Linkdin={"asdf.com"}
            Imagepath={"NULL"}
          />

          <AboutCard
            Name={"Leo "}
            role={"Team Lead"}
            devrole={"FullStack Engineer"}
            ClassYear={"2026"}
            Major={"Computer Science"}
            Email={"asdf@wpi.edu"}
            Github={"google.com"}
            Linkdin={"asdf.com"}
            Imagepath={"NULL"}
          />
          <AboutCard
            Name={"Vaansh Mansharamani"}
            role={"Assistant Lead"}
            devrole={"Algorithims Engineer"}
            ClassYear={"2026"}
            Major={"Computer Science"}
            Email={" vmansharamani@wpi.edu"}
            Github={"https://github.com/JustSomeOrdinaryCardboardBox"}
            Linkdin={
              "https://www.linkedin.com/in/vaansh-mansharamani-30a6b7227/"
            }
            Imagepath={"NULL"}
          />
          <AboutCard
            Name={"Ethan Zhong"}
            role={"Product Manager"}
            devrole={"Algorithm Engineer"}
            ClassYear={"2025"}
            Major={"Computer Science and Robotics Engineering"}
            Email={"ezhong@wpi.edu"}
            Github={"https://github.com/Ethan-Z8"}
            Linkdin={"https://www.linkedin.com/in/ethan-zhong-76886a21a/"}
            Imagepath={"NULL"}
          />
          <AboutCard
            Name={"Zane Altheimer"}
            role={"Document Analyst"}
            devrole={"Frotend Engineer"}
            ClassYear={"2024"}
            Major={"Robotics Engineering"}
            Email={"asdf@wpi.edu"}
            Github={"google.com"}
            Linkdin={"asdf.com"}
            Imagepath={"NULL"}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            paddingTop: "20px",
            paddingBottom: "10px",
          }}
        >
          <AboutCard
            Name={"Justin Smith"}
            role={""}
            devrole={"Frontend Engineer"}
            ClassYear={"2025"}
            Major={"Computer Science and Game Development"}
            Email={"asdf@wpi.edu"}
            Github={"google.com"}
            Linkdin={"asdf.com"}
            Imagepath={"NULL"}
          />
          <AboutCard
            Name={"Maxwell Friedman"}
            role={""}
            devrole={"Frontend Engineer"}
            ClassYear={"2025"}
            Major={"Robotics Engineering"}
            Email={"asdf@wpi.edu"}
            Github={"google.com"}
            Linkdin={"asdf.com"}
            Imagepath={"NULL"}
          />
          <AboutCard
            Name={"Shawn Patel"}
            role={""}
            devrole={"Backend Engineer"}
            ClassYear={"2026"}
            Major={"Computer Science"}
            Email={"asdf@wpi.edu"}
            Github={"google.com"}
            Linkdin={"asdf.com"}
            Imagepath={"NULL"}
          />

          <AboutCard
            Name={"Mahit Verma"}
            role={""}
            devrole={"Backend Engineer"}
            ClassYear={"2026"}
            Major={"Computer Science"}
            Email={"asdf@wpi.edu"}
            Github={"google.com"}
            Linkdin={"asdf.com"}
            Imagepath={"NULL"}
          />

          <AboutCard
            Name={"Aishwarya Silam"}
            role={"Team Lead"}
            devrole={"FullStack Engineer"}
            ClassYear={"2026"}
            Major={"Computer Science"}
            Email={"asdf@wpi.edu"}
            Github={"google.com"}
            Linkdin={"asdf.com"}
            Imagepath={"NULL"}
          />
        </div>
      </div>
    </div>
  );
};
export default AboutMe;
