import React from "react";
import BaseRender from "./_baseLayout";
import {
  Div,
  GridContainerWithImage,
} from "../components/Sections";
import {
  H1,
  H2,
  Paragraph,
} from "../components/Heading";
import { Colors, StyledBackgroundSection } from "../components/Styling";
import { isCustomBarActive } from "../actions";
import { SessionContext } from "../session";
import ChooseYourProgram from "../components/ChooseYourProgram";

const Programs = ({ data, pageContext, yml }) => {
  const { session } = React.useContext(SessionContext);

  return (
    <>
      <GridContainerWithImage
        id="bottom"
        background={Colors.veryLightBlue2}
        imageSide="right"
        padding={
          isCustomBarActive(session)
            ? "180px 12px 72px 12px"
            : "140px 12px 72px 12px"
        }
        columns_tablet="14"
        margin="0"
        margin_tablet="0"
      >
        <Div
          flexDirection="column"
          margin="0"
          justifyContent_tablet="start"
          padding_tablet="0 30px"
          gridArea_tablet="1/1/1/6"
        >
          <Div
            flexDirection="column"
            size="12"
            size_tablet="12"
            width="100%"
            width_tablet="100%"
            margin="0"
            textAlign_sm="center"
          >
            <H1
              type="h1"
              margin="0 0 11px 0"
              textAlign_tablet="left"
              color={Colors.blue}
              textTransform="uppercase"
            >
              {yml.seo_title}
            </H1>
            <H2
              type="h2"
              padding="0"
              textAlign_tablet="left"
              fontSize="40px"
              fontSize_tablet="50px"
              lineHeight="60px"
            >
              {yml.header.title}
            </H2>
            <Paragraph
              padding="0"
              textAlign_tablet="left"
              letterSpacing="0.05em"
              margin="26px 0"
              color={Colors.black}
              opacity="1"
            >
              {yml.header.paragraph}
            </Paragraph>
          </Div>
        </Div>
        <Div
          height="auto"
          width="100%"
          gridArea_tablet="1/7/1/13"
          style={{ position: "relative" }}
        >
          <StyledBackgroundSection
            height={`350px`}
            borderRadius={`3px`}
            image={yml.header.image}
            bgSize={`contain`}
            alt={yml.header.image_alt}
          />
        </Div>
      </GridContainerWithImage>
      <ChooseYourProgram
        // chooseProgramRef={chooseProgramRef}
        lang={pageContext.lang}
        programs={data.allChooseYourProgramYaml.edges[0].node.programs}
        title={yml.choose_program.title}
        paragraph={' '}
      />

      <Div>
        <H2 type="h2" margin="0 0 40px 0">
          {yml.content.title}
          <span style={{ color: Colors.blue }}>
            {yml.content.title_highlighted}
          </span>
        </H2>
      </Div>
    </>
  );
};

export const query = graphql`
  query ProgramsQuery($file_name: String!, $lang: String!) {
    allPageYaml(
      filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang } } }
    ) {
      edges {
        node {
          seo_title
          header {
            title
            paragraph
            image_alt
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 500
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  quality: 100
                  breakpoints: [200, 340, 520, 890]
                )
              }
            }
          }
          choose_program {
            title
            paragraph
          }
          content{
            title
            title_highlighted
          }
        }
      }
    }
    allChooseYourProgramYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          programs {
            link
            sub_title
            title
            description
            description_mobile
            icon
          }
        }
      }
    }
  }
`;

export default BaseRender(Programs);
