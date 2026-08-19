import React from "react";
import back1 from "../assets/back1.jpg";
import back2 from "../assets/back2.jpg";
import back3 from "../assets/back3.jpg";
import back4 from "../assets/back4.jpg";
import back5 from "../assets/back5.jpg";

function Background({ heroCount }) {
  const backgrounds = [back2, back1, back3, back4, back5];

  return (
    <img
      src={backgrounds[heroCount]}
      alt="Background"
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
}

export default Background;