import React from 'react';
import {Title} from '../Heading'
import styled from 'styled-components';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';


const Locations = props => (
    <div className="container  mt-5">
        <Title
            title="OUR LOCATIONS"
            style="light"
            paragraph="Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Morbi leo risus, porta ac consectetur ac, vestibulum at eros."
        />
        <div className="row ">
            <div className="col-md-12">
                <Carousel>
                    <div>
                        <img src="assets/1.jpeg" />
                        <p className="legend">Legend 1</p>
                    </div>
                    <div>
                        <img src="assets/2.jpeg" />
                        <p className="legend">Legend 2</p>
                    </div>
                    <div>
                        <img src="assets/3.jpeg" />
                        <p className="legend">Legend 3</p>
                    </div>
                </Carousel>
            </div>

        </div>
        <div className="row"></div>
    </div>
);


export default Locations;