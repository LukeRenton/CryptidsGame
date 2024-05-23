import React from "react";
import "../Styles/Cylinder.css";

// Cylinder component: Represents a 3D cylinder-like object with customizable color and position based on props.
export default function Cylinder(props) {
  // Render the cylinder element with dynamic styles
    return (
      <div className="cylinder" style={{background: `radial-gradient(50% 20px at 50% 10px, #0003 99.99%, #0000 0), radial-gradient(50% 10px at 50% calc(100% - 10px), #fff3 99.99%, #0000 0), ${props.color}`, transform: `translateZ(${80+10*props.index}px) translateY(30px) translateX(50px)`}}></div>
    )
}