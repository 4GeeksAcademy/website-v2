import React from 'react';
import styled from 'styled-components';
import {useSpring, animated} from 'react-spring'
import range from 'lodash-es/range'
// import './styles.css'
import '../../assets/css/style.css'

const items = range(4)
const interp = i => r => `translate3d(0, ${15 * Math.sin(r + (i * 2 * Math.PI) / 1.6)}px, 0)`

const Spring = () => {
    const {radians} = useSpring({
        to: async next => {
            while (1) await next({radians: 2 * Math.PI})
        },
        from: {radians: 0},
        config: {duration: 3500},
        reset: true,
    })
    return items.map(i => <animated.div key={i} className="script-bf-box" style={{transform: radians.interpolate(interp(i))}} />)
}

// ReactDOM.render(<App />, document.getElementById('root'))
// const Spring = () => (
//     <div>Spring</div>
// );

export default Spring;