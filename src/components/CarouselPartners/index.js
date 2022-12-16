import React, { useState, useRef } from "react";
import { GridContainer, Div } from "../Sections";
import PropTypes from "prop-types";
import { H2, H3, H4, Paragraph } from "../Heading";
import { Colors, StyledBackgroundSection, Button } from "../Styling";
import Icon from "../Icon";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PartnerCard = ({ partner }) => {
  return (
    <Div>
      <h1>{partner.fist_name}</h1>
    </Div>
  );
}

const CarouselPartners = () => {
  const partner = {
    fist_name: 'Jane',
    last_name: 'Doe',
    sub_header: 'CEO @ Globant',
    paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur molestie massa et iaculis elementum. Aliquam pellentesque tincidunt dolor. Nullam rutrum eget nisl vel faucibus. Quisque vitae enim eu diam luctus finibus eu sit amet odio. Proin eget erat cursus, molestie orci at, viverra nisl.',
    linkedin: 'linkedin.com'
  }
  return <PartnerCard partner={partner} />
};

export default CarouselPartners;