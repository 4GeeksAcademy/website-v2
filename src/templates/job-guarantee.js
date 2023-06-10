import React, { useEffect, useState, useRef, useContext } from "react";
import { graphql } from "gatsby";
import { Link } from "gatsby";
import { isCustomBarActive, requestSyllabus, beHiringPartner } from "../actions";
import BaseRender from "./_baseLayout";
import { Div, HR, GridContainer } from "../components/Sections";
import { H2, H3, Paragraph } from "../components/Heading";
import { Button, Colors, ImgV2 } from "../components/Styling";
import { SessionContext } from "../session";
import Modal from "../components/Modal";
import LeadForm from "../components/LeadForm";
import { Circle } from "../components/BackgroundDrawing";
import Testimonials from "../components/Testimonials";
import Icon from "../components/Icon";
import OurPartners from "../components/OurPartners";
import ScholarshipProjects from "../components/ScholarshipProjects";
import ScholarshipSuccessCases from "../components/ScholarshipSuccessCases";
import BenefitsAndCharts from "../components/BenefitsAndCharts";
import { TwoColumn } from "../components/Landing";

const JobGuarantee = ({ data, pageContext, yml }) => {
  const { session } = useContext(SessionContext);
  const [applyButtonText, setApplyButtonText] = useState("");
  const joinPartnersRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const goToForm = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: joinPartnersRef.current?.offsetTop - 200,
      behavior: "smooth",
    });
  };

  let city = session && session.location ? session.location.city : [];
  let currentLocation = data.allLocationYaml.edges.find(
    (loc) => loc.node?.city === city
  );

  useEffect(() => {
    if (currentLocation !== undefined) {
      setApplyButtonText(currentLocation.node.button.apply_button_text);
    }
  }, [currentLocation]);

  const ymlTwoColumn = yml?.two_column_left;

  return (
    <>
      <Div
        margin={isCustomBarActive(session) ? "40px 0 0 0" : "0"}
        padding="90px 30px 42px 30px"
        padding_tablet="120px 130px 72px 130px"
        position="relative"
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
          left="74px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="grey"
          width="17px"
          height="17px"
          top="172px"
          left="74px"
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
        <Circle
          color="grey"
          width="17px"
          height="17px"
          top="298px"
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
          color="grey"
          width="17px"
          height="17px"
          top="145px"
          left="106px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="grey"
          width="17px"
          height="17px"
          top="182px"
          left="106px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="yellow"
          width="17px"
          height="17px"
          top="246px"
          left="106px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="blue"
          width="30px"
          height="30px"
          top="120px"
          right="83px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="grey"
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
          color="grey"
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
          left="14px"
          zIndex="1"
          display="inline"
          display_tablet="none"
        />
        <Circle
          color="grey"
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
        <Div display="block">
          <H2
            type="h2"
            textAlign="left"
            textAlign_tablet="center"
            fontSize="40px"
            fontSize_tablet="50px"
            lineHeight="38px"
            lineHeight_tablet="60px"
            margin_tablet="40px 0 40px 0"
            textTransform="uppercase"
          >
            {yml.header.title}
          </H2>
          <Paragraph
            color="black"
            opacity="1"
            margin="15px auto"
            padding="0"
            width="auto"
            letterSpacing="0.05em"
            textAlign="center"
            fontSize="24px"
            lineHeight="28px"
            maxWidth="760px"
          >
            {yml.header.paragraph}
          </Paragraph>
          <Div
            flexDirection_tablet="row"
            flexDirection="column"
            justifyContent="start"
            justifyContent_tablet="center"
            alignItems="center"
            margin_tablet="0 0 50px 0"
          >
            <Div width="100%" width_tablet="fit-content">
              <Link to={yml.button.apply_button_link} style={{ width: "100%" }}>
                <Button
                  variant="full"
                  justifyContent="center"
                  width="200px"
                  width_tablet="fit-content"
                  color={Colors.blue}
                  margin_tablet="10px 24px 10px 0"
                  textColor="white"
                >
                  {applyButtonText}
                </Button>
              </Link>
            </Div>
            <Button
              display="block"
              width="100%"
              width_tablet="fit-content"
              variant="outline"
              color={Colors.blue}
              margin="10px 0 50px 0"
              margin_tablet="0"
              textColor={Colors.blue}
              textAlign="center"
            >
              {yml.button.btn_label}
            </Button>
          </Div>
        </Div>
      </Div>
      <Div
        id="two_column_left"
        flexDirection="column"
        padding="0 0 50px 0"
        padding_tablet="50px 6% 0 6%"
        margin="0"
      >
        <TwoColumn
          right={{ image: ymlTwoColumn.image }}
          left={{
            heading: ymlTwoColumn.heading,
            sub_heading: ymlTwoColumn.sub_heading,
            bullets: ymlTwoColumn.bullets,
            content: ymlTwoColumn.content,
            button: ymlTwoColumn.button,
          }}
          proportions={ymlTwoColumn.proportions}
          session={session}
        />
      </Div>
      <Div
        id="we-trust"
        flexDirection="column"
        padding="50px 0 50px 0"
        padding_tablet="50px 6%"
        margin="0"
      >
        <Div
          padding="50px 10px"
          padding_tablet="30px"
          margin="0"
          background={Colors.lightBlue}
          display="block"
        >
          <Div display="block">
            <H2 textAlign="left" margin="0 0 15px 0">
              {yml.we_trust_section.title}
            </H2>
            <Paragraph
              textAlign="left"
              color={Colors.darkGray}
              opacity="1"
              fontSize="18px"
              dangerouslySetInnerHTML={{ __html: yml.we_trust_section.text }}
            />
          </Div>
          <Div
            margin="15px 0 0 0"
            justifyContent_tablet="between"
            gap="15px"
            flexDirection="column"
            flexDirection_tablet="row"
          >
            {yml.we_trust_section.boxes.map((box) => (
              <Div
                key={box.title}
                background="#FFF"
                border="3px solid #000"
                width="100%"
                width_md="320px"
                height_md="320px"
                width_tablet="200px"
                height_tablet="200px"
                boxShadow="6px 6px 0px 0px rgba(0,0,0,1)"
                boxShadow_tablet="9px 8px 0px 0px rgba(0,0,0,1)"
                flexDirection_tablet="column"
                justifyContent_tablet="center"
                padding="15px"
                alignItems="center"
                alignItems_tablet="normal"
              >
                <Icon icon={box.icon} width="89px" height="89px" color={null} />
                <Div
                  margin="0 0 0 15px"
                  margin_tablet="20px 0 0 0"
                  display="flex"
                  flexDirection="column"
                  display_tablet="block"
                >
                  <H3
                    textAlign="left"
                    fontWeight="900"
                    fontSize="30px"
                    fontSize_tablet="50px"
                    margin="0 0 20px 0"
                  >
                    {box.title}
                  </H3>
                  <Paragraph
                    textAlign="left"
                    color="#000"
                    opacity="1"
                    fontSize="18px"
                  >
                    {box.text}
                  </Paragraph>
                </Div>
              </Div>
            ))}
          </Div>
        </Div>
      </Div>
      <Div display="block" margin="0 0 20px 0">
        <Div display="block" margin="0 auto 40px 0" padding="0 20px">
          <H2 margin="0 0 15px 0">{yml.how_it_works.title}</H2>
          <Paragraph color="#000" opacity="1" fontSize="18px">
            {yml.how_it_works.text}
          </Paragraph>
        </Div>
        <Div
          margin="auto"
          width="300px"
          width_tablet="fit-content"
          gap_tablet="30px"
          gap_md="40px"
          flexDirection="column"
          flexDirection_tablet="row"
        >
          {yml.how_it_works.steps.map((step, i) => (
            <Div
              width="100%"
              width_tablet="90px"
              width_md="130px"
              height_tablet="300px"
              position="relative"
            >
              {i !== yml.how_it_works.steps.length - 1 && (
                <ImgV2
                  src="/images/dotted-line.png"
                  position="absolute"
                  left_tablet="50%"
                  left="90px"
                  top_md={i % 2 === 0 ? "30px" : "5px"}
                  top_tablet="30px"
                  top="80px"
                  rotate_tablet={i % 2 !== 0 && "123deg"}
                  rotate={i % 2 !== 0 && "-45deg"}
                  alt="Dashed line"
                  width_tablet="150px"
                  width_md="200px"
                  width="150px"
                  height="69px"
                  height_tablet="69px"
                  height_md="119px"
                  backgroundSize="contain"
                />
              )}
              <Div
                flexDirection={i % 2 === 0 ? "row" : "row-reverse"}
                justifyContent="between"
                justifyContent_tablet="start"
                flexDirection_tablet="column"
                alignItems="center"
                position_tablet="absolute"
                top={i % 2 !== 0 && "70px"}
                zIndex="5"
                width="100%"
                width_tablet="auto"
              >
                <Div
                  flexDirection="column"
                  justifyContent="center"
                  width="120px"
                  width_tablet="90px"
                  width_md="120px"
                  height="120px"
                  height_tablet="90px"
                  height_md="120px"
                  border={`4px solid #FFB718`}
                  background="#FFF1D1"
                  borderRadius="60px"
                >
                  <Icon
                    style={{ margin: "auto" }}
                    color="#FFB718"
                    icon={step.icon}
                    width="45px"
                    height="45px"
                  />
                </Div>
                <Paragraph fontSize={step.highlight ? "20px" : "18px"} color={step.highlight ? "#FFB718" : "#000"} opacity="1" maxWidth="130px" maxWidth_tablet="90px" maxWidth_md="130px">
                  {`${i + 1}. ${step.title}`}
                </Paragraph>
              </Div>
            </Div>
          ))}
        </Div>
      </Div>
      <ScholarshipSuccessCases
        content={data.allScholarshipSuccessCasesYaml.edges[0].node}
      />
      <HR
        background={Colors.verylightGray}
        width="100%"
        height="5px"
        margin="40px 0"
      />
      <GridContainer
        columns_tablet="12"
        padding="0 17px 40px 17px"
        padding_tablet="0"
        margin_tablet="0 0 81px 0"
      >
        <Div
          ref={joinPartnersRef}
          gridColumn_tablet="1 / 7"
          flexDirection="column"
        >
          <H2 textAlign_md="left" margin="0 0 30px 0">
            {yml.form.title}
          </H2>
          {yml.form.paragraph.split("\n").map((m, i) => (
            <Paragraph
              key={i}
              margin="7px 0"
              textAlign_md="left"
              dangerouslySetInnerHTML={{ __html: m }}
            />
          ))}
        </Div>
        <Div flexDirection="column" gridColumn_tablet="7 / 13">
          <LeadForm
            formHandler={beHiringPartner}
            // handleClose={handleClose}
            enableAreaCodes={false}
            lang={pageContext.lang}
            inputBgColor={Colors.white}
            fields={["full_name", "email", "phone"]}
          />
        </Div>
      </GridContainer>
    </>
  );
};

export const query = graphql`
  query JobGuaranteeQuery($file_name: String!, $lang: String!) {
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
          two_column_left {
            proportions
            image {
              style
              src
            }
            heading {
              text
              font_size
            }
            content {
              text
              font_size
            }
            button {
              text
              color
              background
              hover_color
              path
            }
          }
          we_trust_section {
            title
            text
            boxes {
              icon
              title
              text
            }
          }
          how_it_works {
            title
            text
            steps {
              icon
              title
              highlight
            }
          }
          form {
            title
            paragraph
          }
        }
      }
    }
    allScholarshipSuccessCasesYaml(
      filter: { fields: { lang: { eq: $lang } } }
    ) {
      edges {
        node {
          title
          contributor
          cases {
            name
            img {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 700
                  quality: 100
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  breakpoints: [200, 340, 520, 890]
                )
              }
            }
            status
            country {
              iso
              name
            }
            contributor
            description
            achievement
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

export default BaseRender(JobGuarantee);
