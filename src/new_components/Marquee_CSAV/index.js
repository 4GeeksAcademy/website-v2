import React, { useRef, useState, useEffect } from 'react'
import cx from 'classnames'
import styles from '../../assets/css/marquee-v2.module.css'
import DragScrollProvider from '../DragScrollProvider'

//provided by xdmorgan https://gist.github.com/xdmorgan/7b5e10493d87d8f4fe18d55d76d79ac6
export default function Marquee({
  children,
  className = undefined,
  reverse = false,
  ...props
}) {
  const [count, ref, width] = useMarquee()
  React.Children.only(children)
  const [child] = React.Children.toArray(children)
  return (
    <div
    {...props}
      style={props.containerStyle}
      className={cx(
        styles.marquee,
        {
          [styles.animated]: count !== null,
          [styles.reversed]: !!reverse,
        },
        className
      )}
    >
      <div ref={ref} className={styles.marquee__measure} aria-hidden>
        {children}
      </div>
      {/* <div className={styles.marquee__spacer}>{children}</div> */}
      <DragScrollProvider className={`${styles.marquee__overflow} testimonial-slider`}>
        <div className={styles.marquee__elements} style={{ width }} aria-hidden>
          {Array.from({ length: count }).map((_, idx) =>
            React.cloneElement(child, {
              ...child.props,
              key: `marqueev2-${idx}`,
              style: { ...child.props.style, flex: '0 0 auto' },
            })
          )}
        </div>
      </DragScrollProvider>
    </div>
  )
}

const getWidth = el => el.clientWidth

function fillContainer(el) {
  // get the individual element width and the container width as basis
  // for inFullView calculation
  const [single, total] = [getWidth(el), getWidth(el.parentNode)]
  // the floored number of elements completely visible in the container
  const inFullView = Math.floor(total / single)
  // FillGaps: add one so there is never an empty space left out by the
  // inFullView calculation e.g. 100px card in 150px contaienr. There
  // would be 1 in full view but then a 50px gap
  const fillGaps = 1
  // accountForAnimation: The animation pans the container of the repeated
  // elements across the X access equal to the width of a single element
  // in order to make sure there are no gaps whilst animating we'll need
  // an additional 1 extra to make up for the one being animted offscreen.
  const accountForAnimation = 1
  // combine & return
  return inFullView + fillGaps + accountForAnimation
}

function useMarquee() {
  const ref = useRef()
  const [count, setCount] = useState(null)

  useEffect(() => {
    let throttle

    function onUpdate() {
      clearTimeout(throttle)
      if (ref && ref.current) {
        throttle = setTimeout(() => setCount(fillContainer(ref.current)), 500)
      }
    }

    onUpdate()
    window.addEventListener('resize', onUpdate)

    return () => {
      clearTimeout(throttle)
      window.removeEventListener('resize', onUpdate)
    }
  }, [ref])

  return [count, ref, ref.current ? getWidth(ref.current) : null]
}