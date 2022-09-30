import React, { useEffect } from "react";

const ScrollSpy = ({
  className = "active",
  offsetTop = 0,
  autoScrollOffsetTop = 0,
  offsetLeft = 0,
  duration = 1000,
  children,
}) => {
  let currentChild = 0;
  let scrollSpyNavContainer;
  let viewportWidth;

  useEffect(() => {
    viewportWidth = window.innerWidth;

    if (typeof document !== "undefined" && viewportWidth <= 768) {
      scrollSpyNavContainer = document.querySelector(".scroll-spy-container");
    }
  });

  const handleAutoNavScroll = () => {
    if (scrollSpyNavContainer !== null) {
      scrollSpyNavContainer.scrollTo({
        left: scrollSpyNavContainer.children.item(currentChild).offsetLeft - 25,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const sourceElements = [];
    const targetElements = [];

    const throttle = (fn, wait = 100) => {
      let timer;
      let time = Date.now();

      return (params) => {
        clearTimeout(timer);

        if (time + wait - Date.now() < 0) {
          fn(params);
          time = Date.now();
        } else {
          timer = setTimeout(fn, wait / 5);
        }
      };
    };

    const isBetween = (curr, next, value) => {
      if (next !== undefined) {
        return value >= Math.min(curr, next) && value < Math.max(curr, next);
      }
      return value >= curr;
    };

    const onScrollHandler = throttle(() => {
      const scrollElement =
        document.scrollingElement || document.documentElement;

      const center = {
        x: scrollElement.scrollLeft + window.innerWidth / 2,
        y: scrollElement.scrollTop + offsetTop,
      };

      sourceElements.map((source, i) => {
        const target = targetElements[i];

        const visibleHorizontal =
          target.offsetLeft >= 0 &&
          center.x >= target.offsetLeft &&
          center.x < target.offsetLeft + target.offsetWidth;

        const visibleVertical = isBetween(
          target.offsetTop,
          targetElements[i + 1]?.offsetTop,
          center.y
        );

        if (visibleVertical && visibleHorizontal) {
          source.classList.add(className);
          currentChild = i;
          viewportWidth <= 768 && handleAutoNavScroll();
        } else {
          source.classList.remove(className);
        }

        return true;
      });
    });

    children.map((el) => {
      const href = el.props && el.props.href;
      const self = el.ref && el.ref.current;

      if (!self || !href || href.charAt(0) !== "#") {
        return false;
      }

      self.addEventListener("click", (e) => {
        if (targetElement !== undefined || targetElement !== null) {
          window.scrollTo({
            top: targetElement?.offsetTop + autoScrollOffsetTop,
          });
        }
        return null;
      });
      const targetElement =
        href === "#" ? document.body : document.querySelector(href);

      if (targetElement) {
        targetElements.push(targetElement);
        sourceElements.push(self);
      }

      return true;
    });

    if (targetElements.length) {
      const ScrollEvent = new Event("scroll");
      window.addEventListener("scroll", onScrollHandler, { passive: true });
      window.dispatchEvent(ScrollEvent);
    }

    return () => {
      window.removeEventListener("scroll", onScrollHandler);
    };
  }, [
    children,
    className,
    duration,
    offsetTop,
    autoScrollOffsetTop,
    offsetLeft,
    handleAutoNavScroll,
  ]);

  return <>{children}</>;
};

export default ScrollSpy;
