import { useState, useEffect } from "react";

// this function works as our way to control the animation speed
function getNextTransition(width, index, translate, direction, setTranslate) {
  const to = width * (index + (direction === "next" ? 1 : -1));

  // within half the width, slow down
  if (
    (to - translate < width / 2 && direction === "next") ||
    (to - translate > -(width / 2) && direction === "prev")
  ) {
    setTranslate(direction === "next" ? translate + 1 : translate - 1);
  }

  setTranslate(direction === "next" ? translate + 2 : translate - 2);
}

export default function useTransition(width, children) {
  const len = children.length;

  // declare state variables
  const [index, setIndex] = useState(1);
  const [translate, setTranslate] = useState(width);
  const [action, setAction] = useState({ lastAction: "", currentAction: "" });
  const [items, setItems] = useState([children[len - 1], ...children]);
  const setNextAction = (currentAction) => {
    setAction({
      lastAction: action.currentAction,
      currentAction,
    });
  };

  // this effect hook will be triggered every time the "translate variable will change"
  useEffect(() => {
    // if the transition has not completed, continue with transition
    if (
      (translate < (index + 1) * width && action.currentAction === "next") ||
      (translate > (index - 1) * width && action.currentAction === "prev")
    ) {
      getNextTransition(
        width,
        index,
        translate,
        action.currentAction,
        setTranslate
      );
    } else if (action.currentAction !== "") {
      // otherwise set the next action to be ''
      setNextAction("");
    }
  }, [translate]);

  // this effect hook will be triggered every time the action object changes.
  useEffect(() => {
    // if we click next when we are at the end of our carousel.
    if (action.currentAction === "next" && index + 1 > len) {
      // add the first item to the end of the array
      setItems([children[len - 1], ...children, children[0]]);
      // start transition
      setTranslate(translate + 1);

      // if we clicked next
    } else if (action.currentAction === "next") {
      // start transition
      setTranslate(translate + 1);

      // if we clicked prev
    } else if (action.currentAction === "prev") {
      // start transition
      setTranslate(translate - 1);

      // if we have gone past the last item (and onto the extra one)
    } else if (index + 1 > len && action.lastAction === "next") {
      // reset items to initial state
      setItems([children[len - 1], ...children]);
      // set translate to the 1 index of the array
      setTranslate(width);
      // and set the current index to one.
      setIndex(1);

      // if we reached the first (duplicate) item in the array and want to go back
    } else if (index - 1 === 0 && action.lastAction === "prev") {
      // set index to last item in array
      setIndex(len);
      // set translate to last item in array
      setTranslate(len * width);

      // if transition next happened
    } else if (action.lastAction === "next") {
      // update index
      setIndex(index + 1);

      // if transition prev happened
    } else if (action.lastAction === "prev") {
      // update index
      setIndex(index - 1);
    }
  }, [action]);

  // return all variables to be used with the hook.
  return {
    index,
    translate,
    setIndex,
    setTranslate,
    items,
    setAction: setNextAction,
  };
}
