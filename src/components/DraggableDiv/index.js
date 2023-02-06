import React, { useState, useRef, useEffect } from "react";
import { Div } from "../Sections";

const DraggableDiv = ({ children, ...props }) => {
  const ref = useRef();

  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX - ref.current.offsetLeft);
    setScrollLeft(ref.current.scrollLeft);
  };

  const onMouseLeave = () => {
    setIsDown(false);
  };

  const onMouseUp = () => {
    setIsDown(false);
  };

  const onMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX) * 3; //scroll-fast
    ref.current.scrollLeft = scrollLeft - walk;
    console.log(walk);
  };

  // useEffect(() => {
  //   if (typeof document !== "undefined") {
  //     if (ref && ref.current) {
  //       document.addEventListener("mousedown", onMouseDown);
  //       document.addEventListener("mouseup", onMouseUp);
  //       document.addEventListener("mousemove", onMouseMove);
  //       document.addEventListener("mouseleave", onMouseLeave);

  //       return () => {
  //         document.removeEventListener("mousedown", onMouseDown);
  //         document.removeEventListener("mouseup", onMouseUp);
  //         document.removeEventListener("mousemove", onMouseMove);
  //         document.removeEventListener("mouseleave", onMouseLeave);
  //       };
  //     }
  //   }
  // });

  return (
    <>
      <Div
        ref={ref}
        key="draggalbe"
        cursor="grab"
        overflowX="hidden"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        display_md="flex"
        display="none"
        {...props}
      >
        {children}
      </Div>
      <Div
        className="testimonial-slider"
        display_md="none"
        display="flex"
        {...props}
      >
        {children}
      </Div>
    </>
  );
};

export default DraggableDiv;
