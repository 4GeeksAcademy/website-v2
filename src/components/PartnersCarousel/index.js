import React, { useState, useRef } from "react";
import Link from "gatsby-link";
import { navigate } from "gatsby";
import PropTypes from "prop-types";
import { GridContainer, Div } from "../Sections";
import { H2, H3, H4, Paragraph } from "../Heading";
import { Colors, Img, Button } from "../Styling";
import Icon from "../Icon";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PartnerCard = ({ partner, linkText }) => {
  return (
    <Div
      width="300px"
      flexDirection="column"
      borderRadius="4px"
      border="1px solid #7E8F9A"
      padding="10px"
    >
      <H3 margin="0 0 5px 0">{partner.fist_name} {partner.last_name}</H3>
      <H4
        color={Colors.darkGray}
        fontWeight="700"
        margin="0 0 10px 0"
      >
        {partner.sub_header}
      </H4>
      <Paragraph margin="0 0 10px 0" fontWeight="500" fontWeight_tablet="500">
        {partner.paragraph}
      </Paragraph>
      <Paragraph margin="0 0 5px 0">
        <Link
          // target="_blank"
          to="#"
          style={{ display: "inline" }}
        >
          {linkText}
        </Link>
      </Paragraph>
      <Div justifyContent="center">
        <Img
          src="/images/linkedin.png"
          onClick={() => {
            if (partner.linkedin.indexOf("http") > -1) window.open(partner.linkedin);
            else navigate(partner.linkedin);
          }}
          style={{
            cursor: 'pointer'
          }}
          alt="Linkedin profile"
          // margin="auto"
          height="20px"
          width="80px"
          backgroundSize="contain"
        />
        <Icon icon="pdf"/>
      </Div>

    </Div>
  );
}

const PartnersCarousel = ({ data }) => {
  const partner = {
    fist_name: 'Jane',
    last_name: 'Doe',
    sub_header: 'CEO @ Globant',
    paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur molestie massa et iaculis elementum. Aliquam pellentesque tincidunt dolor.',
    linkedin: 'https://www.linkedin.com'
  }
  return (
    <Div justifyContent="center">
      <PartnerCard partner={partner} linkText={data.see_full} />
    </Div>
  )
};

export default PartnersCarousel;