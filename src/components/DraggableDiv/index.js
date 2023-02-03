import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
// import PropTypes from 'prop-types';
import { Div } from "../Sections";

// const isWindow = () => (document !== undefined ? true : false);

const DraggableDiv = ({ children, ...props }) => {
  // let slider = isWindow ? document.querySelector('.draggable') : null;
  const ref = useRef();
  // const [isScrolling, SetIsScrolling] = useState(false);
  // const [clientX, SetClientX] = useState(0);
  // const [scrollX, SetScrollX] = useState(0);

  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    console.log("scrollLeft");
    console.log(scrollLeft);
    console.log("ref.current.scrollLeft");
    console.log(ref.current.scrollLeft);
  }, [scrollLeft]);

  // const onMouseDown = (e) => {
  //   SetIsScrolling(true);
  //   SetClientX(e.clientX);
  // };

  // const onMouseUp = () => {
  //   SetIsScrolling(false);
  // };

  // const onMouseMove = (e) => {
  //   if (isScrolling) {
  //     ref.current.scrollLeft = scrollX + e.clientX - clientX;
  //     SetScrollX(scrollX + e.clientX - clientX);
  //     SetClientX(e.clientX);
  //   }
  // };

  const Draggable = styled(Div)`
    position: relative;
    width: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
    white-space: nowrap;
    /* transition: all 0.2s; */
    /* transform: scale(0.98); */
    /* will-change: transform; */
    user-select: none;
    cursor: grab;
  `;

  const onMouseDown = (e) => {
    console.log("onMouseDown");
    setIsDown(true);
    // slider.classList.add('active');
    setStartX(e.pageX - ref.current.offsetLeft);
    console.log("ref.current.scrollLeft ondown");
    console.log(ref.current.scrollLeft);
    setScrollLeft(ref.current.scrollLeft);
  };

  const onMouseLeave = () => {
    setIsDown(false);
    // slider.classList.remove('active');
  };

  const onMouseUp = () => {
    setIsDown(false);
    // slider.classList.remove('active');
  };

  const onMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX) * 3; //scroll-fast
    ref.current.scrollLeft = scrollLeft - walk;
    console.log(walk);
  };

  return (
    <Draggable
      ref={ref}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      {...props}
    >
      {children}
    </Draggable>
  );
};

export default DraggableDiv;
