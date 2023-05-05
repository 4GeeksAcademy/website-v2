import React, { useState, useRef } from "react";
import { Div } from "../Sections";

const DraggableDiv = ({ children, ...props }) => {
  const ref = useRef();

  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e) => {
    setIsDown(true);
    const pageX = e.touches ? e.touches[0].pageX : e.pageX;
    setStartX(pageX - ref.current.offsetLeft);
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
    const pageX = e.touches ? e.touches[0].pageX : e.pageX;
    const x = pageX - ref.current.offsetLeft;
    const walk = (x - startX) * 3; //scroll-fast
    ref.current.scrollLeft = scrollLeft - walk;
  };

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
        onTouchStart={onMouseDown}
        onTouchMove={onMouseMove}
        onTouchEnd={onMouseLeave}
        {...props}
      >
        {children}
      </Div>
    </>
  );
};

export default DraggableDiv;
