//import React, { useEffect, useState } from "react";

import AboutCard from "../components/AboutCard.tsx";
import Aish from "../../src/assets/Aishwarya.png";
import Ajay from "../../src/assets/Ajay.png";
import Ethan from "../../src/assets/Ethan.png";
import Justin from "../../src/assets/Justin.png";
import Leo from "../../src/assets/Leo.png";
import Mahit from "../../src/assets/Mahit.png";
import Max from "../../src/assets/Max.png";
import Shawn from "../../src/assets/Shawnpng.png";
import Zane from "../../src/assets/Zane.png";
import Vaanch from "../../src/assets/Vannch.png";

const AboutMe = () => {
  return (
    <div
      className="about-the-team"
      style={{
        width: "75%",
        paddingTop: "20px",
        paddingBottom: "10px",
        gap: "10px",
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
            Imagepath={Ajay}
            Favorite_quote={""}
          />

          <AboutCard
            Name={"Leo Hirano"}
            role={"Frontend Lead"}
            devrole={"FullStack Engineer"}
            ClassYear={"2025"}
            Major={"Computer Science"}
            Email={"lkhirano@wpi.edu"}
            Github={"https://github.com/notLeoHirano"}
            Linkdin={"asdf.com"}
            Imagepath={Leo}
            Favorite_quote={""}
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
            Imagepath={Vaanch}
            Favorite_quote={""}
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
            Imagepath={Ethan}
            Favorite_quote={""}
          />
          <AboutCard
            Name={"Mahit Verma"}
            role={"Product Owner"}
            devrole={"Full Stack Engineer"}
            ClassYear={"2026"}
            Major={"Computer Science and Data Science"}
            Email={"mverma@wpi.edu"}
            Github={"https://github.com/MaVeryo"}
            Linkdin={"https://www.linkedin.com/in/mahit-verma/"}
            Imagepath={Mahit}
            Favorite_quote={""}
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
            Name={"Zane Altheimer"}
            role={"Document Analyst"}
            devrole={"Frontend Engineer"}
            ClassYear={"2024"}
            Major={"Robotics Engineering"}
            Email={"zaaltheimer@wpi.edu"}
            Github={"https://github.com/z-altheimer"}
            Linkdin={"https://www.linkedin.com/in/zaltheimer/"}
            Imagepath={Zane}
            Favorite_quote={""}
          />
          <AboutCard
            Name={"Justin Smith"}
            role={"Full-time Developer"}
            devrole={"Frontend Engineer"}
            ClassYear={"2025"}
            Major={"Computer Science and Game Development"}
            Email={"jmsmith2@wpi.edu"}
            Github={"https://github.com/JustinS-23"}
            Linkdin={"https://www.linkedin.com/in/justin-smith-b61647215/"}
            Imagepath={Justin}
            Favorite_quote={"'Float like a butterfly, sting like a bee.'"}
          />
          <AboutCard
            Name={"Maxwell Friedman"}
            role={"Scrum Master"}
            devrole={"Frontend Engineer"}
            ClassYear={"2025"}
            Major={"Robotics Engineering"}
            Email={"mlfriedman@wpi.edu"}
            Github={" https://github.com/Steelplate"}
            Linkdin={" https://www.linkedin.com/in/friedman-maxwell/"}
            Imagepath={Max}
            Favorite_quote={""}
          />
          <AboutCard
            Name={"Shawn Patel"}
            role={""}
            devrole={"Backend Engineer"}
            ClassYear={"2026"}
            Major={"Computer Science"}
            Email={"snpatel@wpi.edu"}
            Github={"https://github.com/shawnp221"}
            Linkdin={"https://www.linkedin.com/in/shawn-patel-359a562a7/"}
            Imagepath={Shawn}
            Favorite_quote={""}
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
            Imagepath={Aish}
            Favorite_quote={""}
          />
        </div>
      </div>
    </div>
  );
};
export default AboutMe;
