import React, { useState, useRef } from "react";
import { graphql } from "gatsby";
import {
  GridContainer,
  Header,
  Div,
  Grid,
} from "../components/Sections";
import { H2, H4, Paragraph } from "../components/Heading";
import { Button, Colors } from "../components/Styling";
import OurPartners from "../components/OurPartners";
import Icon from "../components/Icon";
import BaseRender from "./_baseLayout";
import { beHiringPartner } from "../actions";
import LeadForm from "../components/LeadForm/index.js";
import PartnersCarousel from "../components/PartnersCarousel";
import BenefitsAndCharts from "../components/BenefitsAndCharts";
import { GatsbyImage, getImage } from "gatsby-plugin-image";


const Partners = (props) => {
  const { data, pageContext, yml } = props;
  const [open, setOpen] = useState(false);
  const joinPartnersRef = useRef(null);

  const goToForm = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: joinPartnersRef.current?.offsetTop - 200,
      behavior: "smooth",
    });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const partnersData = data.allPartnerYaml.edges[0].node;

  const ButtonPartner = () => (
    <Div
      flexDirection_tablet="row"
      flexDirection="column"
      justifyContent="left"
      alignItems="center"
    >
      <Button
        onClick={goToForm}
        variant="full"
        color={Colors.blue}
        margin="0 auto"
        margin_tablet="10px 24px 10px 0"
        textColor="white"
      >
        {yml.button_section.button_text}
      </Button>
    </Div>
  );
  return (
    <>
      <GridContainer
        padding="10rem 0 4rem"
        padding_tablet="10rem 0 4rem"
        containerColumns_tablet="1fr repeat(12,1fr) 1fr"
        columns_tablet="2"
        maxWidth="1280px"
        margin="auto"
      >
        <Header
          hideArrowKey
          textAlign_tablet="left"
          seo_title={yml.seo_title}
          title={yml.header.title}
          paragraph={yml.header.paragraph}
          padding_tablet="0"
          padding="0 10px"
          margin="0"
          position="relative"
        >
          <ButtonPartner />
        </Header>

        <Div width="100%" height="100%">
          <GatsbyImage
            style={{
              height: "390px",
              minWidth: "150px",
              width: "auto",
              margin: "0 20px",
            }}
            imgStyle={{
              objectFit: "contain",
              WebkitUserDrag: "none",
            }}
            alt={yml.header.image_alt}
            image={getImage(yml.header.image.childImageSharp.gatsbyImageData)}
          />
        </Div>
      </GridContainer>
      <PartnersCarousel data={partnersData.partners_carousel} />
      <GridContainer
        background={Colors.verylightGray}
        containerColumns_tablet="1fr repeat(12,1fr) 1fr"
        padding="70px 0"
        padding_tablet="70px 0"
        childMaxWidth="1280px"
        childMargin="auto"
      >
        <H2
          type="h2"
          fontSize="30px"
          width="auto"
          fontWeight="bold"
          margin="10px 0 30px 10px"
          textAlign="center"
        >
          {partnersData.work_together.title}
        </H2>
        <Div
          display="flex"
          flexFlow="wrap!important"
          gap="40px"
          flexDirection="row"
          justifyContent="center"
        >
          {partnersData.work_together.image_list.map((l, i) => (
            <React.Fragment key={i}>
              <GatsbyImage
                style={{
                  height: "90px",
                  width: "90px",
                  margin: "0 20px",
                }}
                imgStyle={{
                  objectFit: "cover",
                  width: "90px",
                  borderRadius: "50px",
                }}
                alt={l.alt}
                image={getImage(l.image.childImageSharp.gatsbyImageData)}
              />
            </React.Fragment>
          ))}
        </Div>
        <Paragraph
          fontSize="15px"
          color="#3A3A3A"
          padding="35px 10px 0"
          padding_tablet="35px 20% 0"
          letterSpacing="0.05em"
          textAlign="center"
        >
          {partnersData.work_together.description}
        </Paragraph>

        <GridContainer
          padding_tablet="0"
          containerColumns_tablet="1fr repeat(12, 1fr) 1fr"
          margin_tablet="3% 0 4% 0"
          margin="10% 0"
        >
          <Div
            height="2px"
            background="#ACACAC"
            style={{ opacity: "0.5" }}
          />
        </GridContainer>
        <Grid
          gridTemplateColumns_tablet="repeat(auto-fill, minmax(40%, 1fr))"
          columnCount_tablet="2"
          columnCount="0"
          justifyContent="center"
          padding="0 6%"
        >
          {partnersData.work_together.features.map((item, i) => (
            <Div
              key={`${i}-${item.title}`}
              item={item.title}
              display="flex"
              flexDirection="row"
              style={{ position: "relative" }}
              gap="12px"
              width="100%"
              width_tablet="100%"
            >
              <Div height="100%">
                <Icon icon={item.icon} width="70px" height="54px" />
              </Div>
              <Div height="100%" display="flex" flexDirection="column">
                <H4
                  type="h4"
                  textAlign="left"
                  fontSize="14px"
                  align={`left`}
                  align_sm={`left`}
                  color={Colors.black}
                  textTransform="uppercase"
                  fontWeight="700"
                >
                  {item.title}
                </H4>
                <Paragraph
                  textAlign="left"
                  letterSpacing="0.05em"
                  lineHeight="22px"
                  fontWeight="normal"
                  margin="20px 0"
                  align_sm="left"
                  fontFamily="Lato, sans-serif"
                >
                  {item.description}
                </Paragraph>
              </Div>
            </Div>
          ))}
        </Grid>
      </GridContainer>

      <BenefitsAndCharts data={partnersData} goToForm={goToForm} />

      <OurPartners
        marquee
        padding="30px 0 75px 0px"
        images={partnersData.partners.images}
        title={partnersData.partners.tagline}
        paragraph={partnersData.partners.sub_heading}
        showFeatured
        props={partnersData.partners}
      />

      <Div flexDirection="column">
        <Div
          display="flex"
          flexDirection="column"
          alignItems="center"
          padding_tablet="4em"
          padding="4em 2em"
          margin_tablet="0 0 40px 0"
          margin="0 0 40px 0"
          background={Colors.verylightGray}
        >
          <H2
            type="h2"
            fontFamily="Lato"
            fontWeight="900"
            fontSize="15px"
            lineHeight="19px"
            letterSpacing="0.05em"
            color="#3A3A3A"
            width="100%"
            margin="0 0 15px 0"
            textTransform="uppercase"
            style={{ fontStyle: "normal" }}
          >
            {partnersData.coding.tagline}
          </H2>
          <Paragraph
            fontFamily="Lato"
            fontWeight="normal"
            fontSize="15px"
            lineHeight="22px"
            padding="0 10px"
            padding_tablet="0 24%"
            letterSpacing="0.05em"
            color="#3A3A3A"
            width="100%"
            margin="0 0 15px 0"
            style={{ fontStyle: "normal" }}
          >
            {partnersData.coding.sub_heading}
          </Paragraph>
        </Div>
        <OurPartners
          marquee
          padding="0 0 75px 0"
          margin="0"
          images={partnersData.coding.images}
          showFeatured
          props={partnersData.coding}
        />
      </Div>

      <Div
        display="flex"
        margin="10px 0 60px 0"
        flexDirection="column"
        background={Colors.lightYellow}
        gap="50px"
        padding="52px 0"
        flexDirection_tablet="row"
      >
        <Div
          display="flex"
          flexDirection="column"
          width="100%"
          width_tablet="50%"
          alignItems="center"
          padding="0 10px"
          padding_tablet="0 0 0 12em"
          alignSelf="center"
        >
          <H2
            type="h2"
            fontFamily="Lato"
            fontWeight="900"
            fontSize="30px"
            textAlign="left"
            letterSpacing="0.05em"
            color="#3A3A3A"
            width="100%"
            margin="0 0 15px 0"
            padding="0 10px"
            textTransform="uppercase"
            style={{ fontStyle: "normal" }}
          >
            {partnersData.partners_in_education.title}
          </H2>

          {partnersData.partners_in_education.description
            .split("\n")
            .map((m, i) => (
              <Paragraph
                key={i}
                dangerouslySetInnerHTML={{ __html: m }}
                margin="22px 0 0 0"
                padding="0 10px"
                padding_tablet="0"
                color={Colors.darkGray}
                textAlign="left"
                fontSize="15px"
                lineHeight="22px"
              />
            ))}
        </Div>
        <Grid
          display="grid"
          width="100%"
          justifyItems="center"
          width_tablet="50%"
          gap="50px"
          gridTemplateColumns_tablet="repeat(auto-fill, minmax(40%, 1fr))"
          justifyContent="center"
          padding="0 10% 0 6%"
        >
          {partnersData.partners_in_education.image_list.map((l, index) => (
            <Div
              key={index}
              width="235px"
              height="175px"
              background={Colors.white}
              padding="25px"
            >
              <GatsbyImage
                style={{
                  height: "auto",
                  minWidth: "150px",
                  width: "150px",
                  margin: "0 20px",
                }}
                imgStyle={{
                  objectFit: "contain",
                  WebkitUserDrag: "none",
                }}
                alt={l.alt}
                image={getImage(l.image.childImageSharp.gatsbyImageData)}
              />
            </Div>
          ))}
        </Grid>
      </Div>

      <OurPartners
        // marquee
        margin="0 0 80px 0"
        borderBottom={`5px solid ${Colors.verylightGray}`}
        padding="0"
        images={partnersData.financials.images}
        title={partnersData.financials.tagline}
        // paragraph={partnersData.partners.sub_heading}
        // showFeatured
        props={partnersData.financials}
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
            handleClose={handleClose}
            enableAreaCodes={false}
            lang={pageContext.lang}
            inputBgColor={Colors.white}
            fields={["full_name", "email", "phone", "client_comments"]}
          />
        </Div>
      </GridContainer>
    </>
  );
};
export const query = graphql`
  query PartnersQuery($file_name: String!, $lang: String!) {
    allPageYaml(
      filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang } } }
    ) {
      edges {
        node {
          meta_info {
            slug
            title
            description
            image
            keywords
          }
          seo_title
          header {
            title
            paragraph
            image_alt
            button
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 1200
                  quality: 100
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  breakpoints: [200, 340, 520, 890]
                )
              }
            }
          }
          form {
            title
            paragraph
          }
          footer_data {
            alt
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 1600
                  quality: 100
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
          }
          button_section {
            button_text
            button_link
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
              link
            }
            tagline
            sub_heading
            footer_button
            footer_link
          }
          coding {
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
                    width: 150
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
            tagline
            sub_heading
            images {
              name
              featured
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 150
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
            }
          }

          work_together {
            title
            description
            image_list {
              alt
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    quality: 100
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
            }
            features {
              title
              icon
              description
            }
          }

          benefits_and_charts {
            title
            description
            bullets
            button_section {
              button_text
              button_link
            }
            charts {
              title
              list {
                description
                icon
              }
            }
          }
          partners_in_education {
            title
            description
            image_list {
              alt
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    quality: 100
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
            }
          }
          partners_carousel {
            title
            see_full
            partners {
              fist_name
              last_name
              sub_header
              alt
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    quality: 100
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
              paragraph
              linkedin
              pdf
            }
          }
        }
      }
    }
  }
`;
export default BaseRender(Partners);
