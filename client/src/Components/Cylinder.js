import React from "react";
import "../Styles/Cylinder.css";

export default function Cylinder(props) {
  console.log("placed");
    return (
      <div class="cylinder" style={{background: `radial-gradient(50% 20px at 50% 10px, #0003 99.99%, #0000 0), radial-gradient(50% 10px at 50% calc(100% - 10px), #fff3 99.99%, #0000 0), ${props.color}`, transform: `translateZ(${80+10*props.index}px) translateY(30px) translateX(50px)`}}></div>
    //   <div id="container">
    //   <div id="frame">
    //     <div class="strips">
    //       <div class="strip-1"></div>
    //       <div class="strip-2"></div>
    //       <div class="strip-3"></div>
    //       <div class="strip-4"></div>
    //       <div class="strip-5"></div>
    //       <div class="strip-6"></div>
    //       <div class="strip-7"></div>
    //       <div class="strip-8"></div>
    //       <div class="strip-9"></div>
    //       <div class="strip-10"></div>
    //       <div class="strip-11"></div>
    //       <div class="strip-12"></div>
    //       <div class="strip-13"></div>
    //       <div class="strip-14"></div>
    //       <div class="strip-15"></div>
    //       <div class="strip-16"></div>
    //       <div class="strip-17"></div>
    //       <div class="strip-18"></div>
    //       <div class="strip-19"></div>
    //       <div class="strip-20"></div>
    //       <div class="strip-21"></div>
    //       <div class="strip-22"></div>
    //       <div class="strip-23"></div>
    //       <div class="strip-24"></div>
    //     </div>
    //   </div>
    // </div>
    )
}