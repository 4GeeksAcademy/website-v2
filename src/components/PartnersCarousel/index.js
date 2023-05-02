import React, { useRef } from "react";
import Link from "gatsby-link";
import { navigate } from "gatsby";
import { smartRedirecting } from "../../utils/utils.js";
import { Div } from "../Sections";
import { H2, H3, H4, Paragraph } from "../Heading";
import { Colors, Img } from "../Styling";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Icon from "../Icon";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PartnerCard = ({ partner, linkText }) => {
  return (
    <Div
      width="264px"
      flexDirection="column"
      borderRadius="4px"
      border="1px solid #7E8F9A"
      padding="10px"
      flexShrink="0"
      flexShrink_tablet="0"
      margin="0 20px"
    >
      <GatsbyImage
        style={{
          height: "65px",
          width: "65px",
          margin: "auto",
        }}
        imgStyle={{
          objectFit: "cover",
          width: "65px",
          borderRadius: "50px",
        }}
        alt={partner.alt}
        image={getImage(partner.image.childImageSharp.gatsbyImageData)}
      />
      <H3 margin="5px 0 5px 0">
        {partner.fist_name} {partner.last_name}
      </H3>
      <H4 color={Colors.darkGray} fontWeight="700" margin="0 0 10px 0">
        {partner.sub_header}
      </H4>
      <Paragraph margin="0 0 10px 0" fontWeight="500" fontWeight_tablet="500">
        {partner.paragraph}
      </Paragraph>
      {linkText && (
        <Paragraph margin="5px 0 10px 0">
          <Link
            // target="_blank"
            to="#"
            style={{ display: "inline" }}
          >
            {linkText}
          </Link>
        </Paragraph>
      )}
      <Div justifyContent="center">
        <Img
          src="/images/linkedin.png"
          onClick={() => {
            if (partner.linkedin.indexOf("http") > -1)
              window.open(partner.linkedin);
            else navigate(partner.linkedin);
          }}
          style={{
            cursor: "pointer",
          }}
          alt="Linkedin profile"
          margin="0 15px 0 0"
          height="20px"
          width="80px"
          backgroundSize="contain"
        />
        {partner.pdf && partner.pdf !== '' && (
          <Div onClick={(e) => smartRedirecting(e, partner.pdf)}>
            <Icon
              style={{ marginLeft: "0 0 0 15px", cursor: "pointer" }}
              icon="pdf"
            />
          </Div>
        )}
      </Div>
    </Div>
  );
};

const PartnersCarousel = ({ data }) => {
  const sliderRef = useRef();

  const settings = {
    className: "slider variable-width",
    variableWidth: true,
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 6000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
  };

  return (
    <Div padding="30px 30px 45px 30px" width="100%" display="block">
      <H2
        type="h2"
        fontSize="30px"
        width="auto"
        fontWeight="bold"
        margin="10px 0 30px 10px"
        textAlign="center"
      >
        {data.title}
      </H2>
      <Slider {...settings} ref={sliderRef}>
        {data.partners.map((partner) => (
          <PartnerCard partner={partner} linkText={data.see_full} />
        ))}
      </Slider>
    </Div>
  );
};

export default PartnersCarousel;
