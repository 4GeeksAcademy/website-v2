import React from 'react';
import styled from 'styled-components';
import {useSpring, animated} from 'react-spring'
import range from 'lodash-es/range'
// import './styles.css'
import '../../assets/css/style.css'


const items = range(4);
const interp = i => r => `translate3d(0, ${15 * Math.sin(r + (i * 2 * Math.PI) / 1.6)}px, 0)`;
export const Spring = () => {
    // const [count, setCount] = useState(12);
    // const {store, actions} = useContext(Context);
    // const [contentStatus, displayContent] = useState(false);
    // const contentProps = useSpring({
    // 	opacity: contentStatus ? 1 : 0,
    // 	marginTop: contentStatus ? 0 : -1000
    // });
    const {radians} = useSpring({
        to: async next => {
            while (1) await next({radians: 2 * Math.PI});
        },
        from: {radians: 0},
        config: {duration: 3500},
        reset: true
    });
    return (
        <div className="container test">
            {/* <div className="button-container">
				<button onClick={() => displayContent(a => !a)} className="button">
					Toggle Content
				</button>
			</div>
			{!contentStatus ? (
				<div>No Content</div>
			) : (
				// Here's where the animated hook comes into play
				<animated.div className="box" style={contentProps}>
					<h1>This content slid down. Thanks to React Spring</h1>
				</animated.div>
			)} */}

            {items.map(i => (
                <animated.div key={i} className="script-bf-box " style={{transform: radians.interpolate(interp(i))}}>
                    <div className="card">
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">
                                Some quick example text to build on the card title and make up the bulk of the cards
								content.
							</p>
                            <a href="#" className="btn btn-primary">
                                Go somewhere
							</a>
                        </div>
                    </div>
                </animated.div>
            ))}
        </div>
    );
};





// const items = range(4)
// const interp = i => r => `translate3d(0, ${15 * Math.sin(r + (i * 2 * Math.PI) / 1.6)}px, 0)`

// const Spring = () => {
//     const {radians} = useSpring({
//         to: async next => {
//             while (1) await next({radians: 2 * Math.PI})
//         },
//         from: {radians: 0},
//         config: {duration: 3500},
//         reset: true,
//     })
//     return items.map(i => <animated.div key={i} className="script-bf-box" style={{transform: radians.interpolate(interp(i))}} />)
// }

// // ReactDOM.render(<App />, document.getElementById('root'))
// // const Spring = () => (
// //     <div>Spring</div>
// // );

// export default Spring;