import React from "react";
import { graphql } from "gatsby";
import { GridContainer, Div, Grid, Header } from "../components/Sections";
import { H2, H3, Paragraph } from "../components/Heading";
import { Colors, StyledBackgroundSection } from "../components/Styling";
import { isCustomBarActive } from "../actions";
import session, { SessionContext } from "../session";
import Badges from "../components/Badges";
import OurPartners from "../components/OurPartners";
import Credentials from "../components/Credentials";
import BaseRender from "./_baseLayout";
import Staff from "../components/Staff";
import Icon from "../components/Icon";
import { Circle } from "../components/BackgroundDrawing";

const Why = (props) => {
  const { data, pageContext, yml } = props;
  const { session } = React.useContext(SessionContext);
  const cornerstones = yml.cornerstones;
  const hiring = data.allPartnerYaml.edges[0].node;
  const partnersData = data.allPartnerYaml.edges[0].node;
  return (
    <>
      <Header
        seo_title={yml.seo_title}
        title={yml.header.title}
        paragraph={yml.header.paragraph}
        image={yml.header.image.childImageSharp.fluid}
        fontSize_paragraph="21px"
        padding="70px 0 70px 0"
        padding_tablet="70px 0 70px 0"
        margin={isCustomBarActive(session) ? "130px 0 0 0" : "70px 0 0 0"}
        position="relative"
      >
        <Circle
          color="lightBlue"
          width="53px"
          height="53px"
          top="0"
          left="30px"
          zIndex="1"
        />
        <Circle
          color="yellow"
          width="250px"
          height="250px"
          bottom="-50px"
          right="-125px"
          opacity="0.2"
          zIndex="10"
        />
        <Circle
          color="yellow"
          width="116px"
          height="116px"
          bottom="-58px"
          left="-58px"
          zIndex="10"
        />
        <Circle
          color="yellow"
          width="21px"
          height="21px"
          top="160px"
          right="120px"
          zIndex="-1"
        />
        <Circle color="blue" width="9px" height="9px" top="100px" left="10%" />

        <Circle
          color="blue"
          width="57px"
          height="57px"
          top="40px"
          right="10%"
          opacity="0.4"
        />
      </Header>
      <Grid gridTemplateColumns_tablet="14">
        <Div grid_column_tablet="1 / span 14">
          <StyledBackgroundSection
            height={`389px`}
            image={yml.header.image.childImageSharp.gatsbyImageData}
            bgSize={`cover`}
            alt={yml.header.alt}
          />
        </Div>
      </Grid>

      <Badges
        lang={pageContext.lang}
        paragraph={yml.badges.paragraph}
        background={Colors.darkYellow}
        link
        padding="58px 17px"
        padding_tablet="70px 0"
        paddingText="0 0 0.5em 0"
        paddingText_tablet="0 0 1.6em 0"
      />

      <GridContainer
        height="auto"
        columns_tablet="2"
        padding="0"
        margin_tablet="0 0 88px 0"
        childMaxWidth="1280px"
        childMargin="auto"
      >
        <Div
          flexDirection="column"
          justifyContent_tablet="start"
          padding="41px 17px 0 17px"
          padding_tablet="56px 0 0 0"
        >
          <H2 textAlign="left" margin="0 0 15px 0">
            {yml.what_is_4geeks.title}
          </H2>

          {yml.what_is_4geeks.paragraph.split("\n").map((paragraph, index) => (
            <Paragraph key={index} textAlign="left" margin="0 0 15px 0">
              {paragraph}
            </Paragraph>
          ))}
        </Div>
        <Div
          width_tablet="331px"
          justifySelf_tablet="end"
          padding_tablet="56px 0 0 0"
        >
          <StyledBackgroundSection
            height={`390px`}
            width="100%"
            image={
              yml.what_is_4geeks.image &&
              yml.what_is_4geeks.image.childImageSharp.gatsbyImageData
            }
            bgSize={`cover`}
            alt={yml.what_is_4geeks.image_alt}
          />
        </Div>
      </GridContainer>
      <Credentials lang={data.allCredentialsYaml.edges} />
      <GridContainer
        margin="0 0 40px 0"
        padding="0"
        childMaxWidth="1280px"
        childMargin="auto"
      >
        <Div flexDirection="column">
          <H2>{cornerstones.title}</H2>
        </Div>
      </GridContainer>
      <GridContainer
        padding="0 17px"
        height="auto"
        columns_tablet="2"
        margin_tablet="0 0 51px 0"
        margin="0 0 20px 0"
      >
        {Array.isArray(cornerstones.cornerstones_list) &&
          cornerstones.cornerstones_list.map((m, i) => (
            <Div key={i} margin="0 0 40px 0">
              <Div>
                <Icon icon={m.icon} width="43px" height="34px" />
              </Div>
              <Div flexDirection="column" margin="0 0 0 15px">
                <H3 textAlign="left" margin="0 0 20px 0">
                  {m.title}
                </H3>
                {m.content.split("\\n").map((d, i) => (
                  <Paragraph key={i} textAlign="left" color={Colors.darkGray}>
                    {d}
                  </Paragraph>
                ))}
              </Div>
            </Div>
          ))}
      </GridContainer>
      <GridContainer margin_tablet="0 0 76px 0" margin="0 0 65px 0">
        <Div height="5px" background={Colors.verylightGray}></Div>
      </GridContainer>

      <OurPartners
        images={partnersData.partners.images}
        title={partnersData.partners.tagline}
        paragraph={partnersData.partners.sub_heading}
        showFeatured={true}
        props={partnersData.partners}
        marquee
      />
      <Staff lang={pageContext.lang} />
    </>
  );
};

export const query = graphql`
  query AboutQuery($file_name: String!, $lang: String!) {
    allPageYaml(
      filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang } } }
    ) {
      edges {
        node {
          meta_info {
            title
            description
            image
            keywords
          }
          seo_title
          header {
            title
            paragraph
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
          badges {
            paragraph
          }
          what_is_4geeks {
            title
            paragraph
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 500
                  quality: 100
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  breakpoints: [200, 340, 520, 890]
                )
              }
            }
            image_alt
          }
          education {
            left_box {
              heading
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 300
                    # height: 60
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
              alt
            }
            center_box {
              heading
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 300
                    # height: 60
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
              alt
            }
            right_box {
              heading
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: FIXED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 300
                    height: 60
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
              alt
            }
          }
          outcomes {
            heading
            sub_heading
            image
            left {
              title
              content
              sub_content
              bottom_message
            }
            right {
              chart_one {
                title
                data
              }
              chart_two {
                title
                data
              }
              chart_three {
                title
                data
              }
            }
          }
          cornerstones {
            title
            paragraph
            cornerstones_list {
              content
              icon
              title
            }
          }
          staff {
            heading
            sub_heading
          }
          story {
            heading
            sub_heading_one
            button
            button_link
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
          posts {
            heading
            sub_heading
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
  }
`;

export default BaseRender(Why);
