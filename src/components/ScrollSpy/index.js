import React, { useEffect } from 'react';

const ScrollSpy = ({
  className = 'active',
  offsetTop = 0,
  offsetLeft = 0,
  duration = 1000,
  children,
}) => {
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

    const onScrollHandler = throttle(() => {
      const scrollElement = document.scrollingElement || document.documentElement;

      // console.log("scrollElement.scrollTop", scrollElement.scrollTop)
      // console.log("offsetTop", offsetTop)
      // console.log("scrollElement.scrollTop + offsetTop", scrollElement.scrollTop + offsetTop)
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

        const visibleVertical =
          target.offsetTop >= 0 &&
          center.y >= target.offsetTop &&
          center.y < target.offsetTop + target.offsetHeight;

        if (visibleVertical && visibleHorizontal) {
          source.classList.add(className);
        } else {
          source.classList.remove(className);
        }

        return true;
      });
    });

    children.map((el) => {
      const href = el.props && el.props.href;
      const self = el.ref && el.ref.current;

      if (!self || !href || href.charAt(0) !== '#') {
        return false;
      }

      const targetElement = href === '#' ? document.body : document.querySelector(href);

      if (targetElement) {
        targetElements.push(targetElement);
        sourceElements.push(self);
      }

      return true;
    });

    if (targetElements.length) {
      const ScrollEvent = new Event('scroll');
      window.addEventListener('scroll', onScrollHandler, { passive: true });
      window.dispatchEvent(ScrollEvent);
    }

    return () => {
      window.removeEventListener('scroll', onScrollHandler);
    };
  }, [children, className, duration, offsetTop, offsetLeft]);

  return <>{children}</>;
};

export default ScrollSpy;