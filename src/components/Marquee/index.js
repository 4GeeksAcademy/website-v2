import React, { useEffect } from "react";
import { window } from "browser-monads";
import styled, { keyframes } from "styled-components";
import { Break, Devices } from "../Responsive";
import { Colors } from "../Styling";
import { Div } from "../Sections";
import DragScrollProvider from "../DragScrollProvider";

let datos = {};

//Conversion px-vw
const pxTOvw = (valuePx) => {
  var result = (100 / window.innerWidth) * valuePx;
  return result;
};

//Conversion px-vh
const pxTOvh = (valuePx) => {
  var result = (100 * valuePx) / window.innerHeight;
  return result;
};

const Marquee = (props) => {
  //Images to display
  let images = props.config.images;

  //transition duration in seconds
  let duration = props.config.duration.toString() + "s";

  /*Keyframes
    ** goes ok **
    let scrolling = keyframes`
      0% { transform: translateX(40%); }
      100%{ transform: translateX( -100%); }
    `;
    */
  let scrolling = keyframes`
     0% { transform: translateX(5%); }
    100%{ transform: translateX( -95%); }
  `;

  let M = styled(Div)`
    overflow: hidden;
    width: 100vw;
    height: 12vh;
    background: transparent;
    position: relative;
    margin: "0 0 0 0";
  `;

  let MC = styled(Div)`
    list-style: none;
    height: 100%;
    width: auto;
    display: flex;
    background-color: transparent;
    padding: 0 0 0 0;
    animation: ${scrolling} ${props.config.duration}s linear infinite;
    &:hover {
      animation-play-state: paused;
    }
  `;

  let UL = styled.ul`
    list-style: none;
    height: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    justify-content: space-between;

    @media ${Devices.xxs} {
    }
    @media ${Devices.xs} {
    }
    @media ${Devices.sm} {
    }
    @media ${Devices.tablet} {
      margin: ${(props) => props.margin_tablet};
      width: ${(props) => props.width_tablet};
      height: ${(props) => props.height_tablet};
    }
    @media ${Devices.md} {
      width: ${(props) => props.width_md};
      height: ${(props) => props.height_md};
      margin: ${(props) => props.margin_md};
    }
    @media ${Devices.lg} {
    }
    @media ${Devices.xl} {
    }
  `;

  let LI = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    width: datos.pxTOvw(150);
    margin-right: 3.5rem;
    max-height: 100%;
    font-size: 0rem;
    white-space: nowrap;

    border: 0px solid green;
    color: black;

    @media ${Break.md} {
      font-size: ${(props) => props.fontSize || "10px"};
    }
    @media ${Break.sm} {
      font-size: 16px;
    }
    @media ${Break.xs} {
      font-size: 16px;
    }
  `;

  return (
    <>
      {/* margin o margin_tablet */}
      <M>
        {/* <DragScrollProvider className="testimonial-slider"> */}

        <MC>
          <UL>
            {
              //add images to display to ul.
              images.map((image, i) => {
                return <LI key={i}>{image}</LI>;
              })
            }
          </UL>
        </MC>
        {/* </DragScrollProvider> */}
      </M>
    </>
  );
};

export default Marquee;
