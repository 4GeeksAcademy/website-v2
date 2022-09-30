import React, { useRef, useState, useEffect } from "react";
import cx from "classnames";
import styles from "../../assets/css/marquee-v2.module.css";
import DragScrollProvider from "../DragScrollProvider";
import styled, { keyframes } from "styled-components";

const marquee_default = keyframes`
  100% { transform: translate3d(-100%, 0, 0) }
`;
const marquee_reverse = keyframes`
  100% { transform: translate3d(100%, 0, 0) }
`;

const Marquee_elements = styled.div`
  width: ${(props) => props.width};
  display: flex;
  overflow: visible;
  opacity: ${(props) => (props.animated ? 1 : 0)};
  transition: opacity 500ms ease;
  justify-content: ${(props) => (props.reversed ? "flex-end" : "flex-start")};

  animation-name: ${(props) =>
    props.reversed ? marquee_reverse : marquee_default};
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-duration: var(
    --marquee-loop-duration,
    ${(props) =>
      props.numberSpeed
        ? Math.round((props.childCount * 22) / props.numberSpeed)
        : props.childCount * 22}s
  );

  &:hover {
    animation-play-state: paused;
  }
`;

{
  /* 
  CREATED: MARQUEE_V2
  The modifiable properties for this component are :
    speed: number
    reversed: boolean
    containerstyle: object css

*/
}

export default function Marquee_v2({
  children,
  className = undefined,
  ...props
}) {
  const [count, ref, width] = useMarquee();
  React.Children.only(children);
  const [child] = React.Children.toArray(children);

  return (
    <div
      {...props}
      style={props.containerstyle}
      className={cx(
        styles.marquee,
        {
          [styles.reversed]: props.reversed,
        },
        className
      )}
    >
      <div ref={ref} className={styles.marquee__measure} aria-hidden>
        {children}
      </div>
      <DragScrollProvider
        className={`${styles.marquee__overflow} testimonial-slider`}
      >
        <Marquee_elements
          reversed={props.reversed}
          animated={count !== null}
          width={width}
          numberSpeed={props.speed}
          childCount={child.props.children.length}
          aria-hidden
        >
          {Array.from({ length: count }).map((_, idx) =>
            React.cloneElement(child, {
              ...child.props,
              key: `marqueev2-${idx}`,
              style: { ...child.props.style, flex: "0 0 auto" },
            })
          )}
        </Marquee_elements>
      </DragScrollProvider>
    </div>
  );
}

const getWidth = (el) => el.clientWidth;

function fillContainer(el) {
  // get the individual element width and the container width as basis
  // for inFullView calculation
  const [single, total] = [getWidth(el), getWidth(el.parentNode)];
  // the floored number of elements completely visible in the container
  const inFullView = Math.floor(total / single);
  // FillGaps: add one so there is never an empty space left out by the
  // inFullView calculation e.g. 100px card in 150px contaienr. There
  // would be 1 in full view but then a 50px gap
  const fillGaps = 2;
  // accountForAnimation: The animation pans the container of the repeated
  // elements across the X access equal to the width of a single element
  // in order to make sure there are no gaps whilst animating we'll need
  // an additional 1 extra to make up for the one being animted offscreen.
  const accountForAnimation = 1;
  // combine & return
  return inFullView + fillGaps + accountForAnimation;
}

function useMarquee() {
  const ref = useRef();
  const [count, setCount] = useState(null);

  useEffect(() => {
    let throttle;

    function onUpdate() {
      clearTimeout(throttle);
      if (ref && ref.current) {
        throttle = setTimeout(() => setCount(fillContainer(ref.current)), 500);
      }
    }

    onUpdate();
    window.addEventListener("resize", onUpdate);

    return () => {
      clearTimeout(throttle);
      window.removeEventListener("resize", onUpdate);
    };
  }, [ref]);

  return [count, ref, ref.current ? getWidth(ref.current) : null];
}
