import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import { isCustomBarActive } from "../actions";
import BaseRender from "./_baseLayout";
import {
  Container,
  Header,
  Column,
  Wrapper,
  WrapperImage,
  Divider,
  Sidebar,
  Div,
  GridContainer,
} from "../components/Sections";
import {
  Title,
  H1,
  H2,
  H3,
  H4,
  H5,
  Span,
  Paragraph,
} from "../components/Heading";
import { Button, Colors } from "../components/Styling";
import { requestSyllabus } from "../actions";
import { SessionContext } from "../session";
import ProgramDetails from "../components/ProgramDetails";
import ProgramDetailsMobile from "../components/ProgramDetailsMobile";
import PricesAndPayment from "../components/PricesAndPayment_v2";
import Modal from "../components/Modal";
import LeadForm from "../components/LeadForm";
import AlumniProjects from "../components/AlumniProjects";
import Badges from "../components/Badges";
import TechsWeTeach from "../components/TechsWeTeach";
import { Circle } from "../components/BackgroundDrawing";
import UpcomingDates from "../components/UpcomingDates";
import GeeksInfo from "../components/GeeksInfo";
import Testimonials from "../components/Testimonials";
import OurPartners from "../components/OurPartners";
import CourseBlogs from "../components/CourseBlogs";
import Icon from "../components/Icon";

const TwentyMillion = ({ data, pageContext, yml }) => {
  const { session } = React.useContext(SessionContext);
  const [open, setOpen] = React.useState(false);
  const hiring = data.allPartnerYaml.edges[0].node;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [applyButtonText, setApplyButtonText] = useState("");
  let city = session && session.location ? session.location.city : [];
  let currentLocation = data.allLocationYaml.edges.find(
    (loc) => loc.node?.city === city
  );

  useEffect(() => {
    if (currentLocation !== undefined) {
      setApplyButtonText(currentLocation.node.button.apply_button_text);
    }
  }, [currentLocation]);

  const syllabus_button_text = yml.button.btn_label;

  return (
    <>
      <Div
        padding={
          isCustomBarActive(session)
            ? "130px 30px 42px 30px"
            : "90px 30px 42px 30px"
        }
        padding_tablet={
          isCustomBarActive(session)
            ? "160px 130px 72px 130px"
            : "120px 130px 72px 130px"
        }
        position="relative"
        background={Colors.veryLightBlue2}
        display="block"
      >
        <Circle
          color="yellow"
          width="17px"
          height="17px"
          top="87px"
          left="74px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="black"
          width="17px"
          height="17px"
          top="116px"
          left="106px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="black"
          width="17px"
          height="17px"
          top="116px"
          left="74px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="white"
          width="17px"
          height="17px"
          top="172px"
          left="74px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="white"
          width="17px"
          height="17px"
          top="145px"
          left="106px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="white"
          width="17px"
          height="17px"
          top="182px"
          left="106px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="blue"
          width="17px"
          height="17px"
          top="216px"
          left="74px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        {/* <Circle
          color="blue"
          width="30px"
          height="30px"
          top="120px"
          right="83px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        /> */}
        <Circle
          color="white"
          width="17px"
          height="17px"
          top="170px"
          right="50px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="black"
          width="17px"
          height="17px"
          top="170px"
          right="89px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="white"
          width="17px"
          height="17px"
          top="170px"
          right="128px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="yellow"
          width="21px"
          height="21px"
          top="10px"
          right="320px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="blue"
          width="57px"
          height="57px"
          top="32px"
          right="61px"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="blue"
          width="15px"
          height="15px"
          top="92px"
          left="24px"
          zIndex="1"
          display="inline"
          display_tablet="none"
        />
        <Circle
          color="white"
          width="15px"
          height="15px"
          top="130px"
          left="15px"
          zIndex="1"
          display="inline"
          display_tablet="none"
        />
        <Circle
          color="darkGray"
          width="15px"
          height="15px"
          top="195px"
          left="10px"
          zIndex="1"
          display="inline"
          display_tablet="none"
        />
        <Div display="block" maxWidth_tablet="725px">
          <H2
            type="h2"
            textAlign="left"
            fontSize="40px"
            fontSize_tablet="50px"
            lineHeight="38px"
            lineHeight_tablet="60px"
          >
            {yml.header.title}
          </H2>
          <Paragraph
            color="black"
            opacity="1"
            margin="15px 0"
            padding="0"
            width="auto"
            letterSpacing="0.05em"
            textAlign="left"
            fontSize="24px"
            lineHeight="28px"
          >
            {yml.header.paragraph}
          </Paragraph>
          <Div
            flexDirection_tablet="row"
            flexDirection="column"
            // justifyContent="center"
            alignItems="center"
            margin_tablet="0 0 50px 0"
          >
            <Div width="100%" width_tablet="fit-content">
              <Link to={yml.button.apply_button_link} style={{ width: "100%" }}>
                <Button
                  variant="full"
                  justifyContent="center"
                  width="100%"
                  width_tablet="fit-content"
                  color={Colors.black}
                  margin_tablet="10px 24px 10px 0"
                  textColor="white"
                >
                  {applyButtonText}
                </Button>
              </Link>
            </Div>
            <Button
              onClick={handleOpen}
              width="100%"
              width_tablet="fit-content"
              variant="outline"
              color={Colors.black}
              margin="10px 0 50px 0"
              margin_tablet="0"
              textColor={Colors.black}
            >
              {syllabus_button_text}
            </Button>
          </Div>
        </Div>
      </Div>
      <OurPartners images={hiring.partners.images} marquee></OurPartners>
      <GeeksInfo lang={pageContext.lang} />
      <GridContainer
        padding_tablet="0"
        margin_tablet="90px 0 62px 0"
        margin="57px 0"
      >
        <Div height="5px" background="#EBEBEB"></Div>
      </GridContainer>
      <GridContainer padding_tablet="0" margin_tablet="0 0 62px 0">
        <Div height="1px" background="#EBEBEB"></Div>
      </GridContainer>
      <Testimonials
        lang={data.allTestimonialsYaml.edges}
        margin_tablet="75px 0 0 0"
        margin="45px 0 0 0"
      />
    </>
  );
};

export const query = graphql`
  query TwentyMillionQuery($file_name: String!, $lang: String!) {
    allPageYaml(
      filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang } } }
    ) {
      edges {
        node {
          seo_title
          header {
            title
            paragraph
          }
          button {
            btn_label
            apply_button_link
          }
        }
      }
    }
    allTestimonialsYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          heading
          button_text
          button_link
          testimonials {
            student_name
            testimonial_date
            include_in_marquee
            hidden
            linkedin_url
            linkedin_text
            linkedin_image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  height: 14
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
            student_thumb {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 200
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
            short_content
            content
            source_url
            source_url_text
          }
        }
      }
    }
    allCredentialsYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          credentials {
            title
            icon
            value
          }
        }
      }
    }
    allPartnerYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          partners {
            tagline
            sub_heading
            footer_tagline
            footer_button
            footer_link
            images {
              name
              link
              follow
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 150
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
              featured
            }
          }
          coding {
            images {
              name
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 100
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
              featured
            }
            tagline
            sub_heading
          }
          influencers {
            images {
              name
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 100
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
              featured
            }
            tagline
            sub_heading
          }
          financials {
            images {
              name
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 100
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
              featured
            }
            tagline
            sub_heading
          }
        }
      }
    }
    allLocationYaml(
      filter: {
        fields: { lang: { eq: $lang } }
        meta_info: { visibility: { nin: ["hidden", "unlisted"] } }
      }
    ) {
      edges {
        node {
          id
          city
          country
          name
          active_campaign_location_slug
          breathecode_location_slug
          fields {
            lang
            file_name
          }
          button {
            apply_button_text
          }
          meta_info {
            slug
            description
            image
            position
            visibility
            keywords
            redirects
          }
          header {
            sub_heading
            tagline
            alt
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 800
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
          }
        }
      }
    }
  }
`;

export default BaseRender(TwentyMillion);
