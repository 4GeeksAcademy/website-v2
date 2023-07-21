import React from "react";
import { graphql, Link } from "gatsby";
import { isCustomBarActive } from "../actions";
import { Div, Divider } from "../components/Sections";
import { Title, Paragraph } from "../components/Heading";
import { Colors, StyledBackgroundSection } from "../components/Styling";
import Card from "../components/Card";
import BaseRender from "./_baseLayout";
import AlumniProjects from "../components/AlumniProjects";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { SessionContext } from "../session";

const Graduates = ({ data, pageContext, yml }) => {
  const { session } = React.useContext(SessionContext);
  return (
    <Div
      margin={isCustomBarActive(session) ? "120px 0 24px 0" : "70px 0"}
      padding="60px 0"
      padding_tablet="60px 100px"
      flexDirection="column"
    >
      <Title
        title={yml.banner.tagline}
        variant="primary"
        size="8"
        paragraph={yml.banner.sub_heading}
        paragraphColor={Colors.darkGray}
      />
      <AlumniProjects
        containerStyle={{ margin: "30px 0" }}
        lang={data.allAlumniProjectsYaml.edges}
        showThumbs="true"
        playerHeight="500px"
      />

      <Divider height="150px" />
      <Div flexDirection="column" height="400px" padding="0 10%">
        <Title
          title={yml.about.heading}
          variant="primary"
          size="8"
          paragraph={yml.about.sub_heading}
        />
        <Card shadow borders="1.25rem">
          <Div
            display="flex"
            height="100%"
            marginLeft="0"
            marginRight="0"
            customRespSize
          >
            <Div
              size="6"
              size_sm={`12`}
              justifyContent="center"
              alignSelf="center"
              flexDirection="column"
              height="100%"
            >
              <Div display="flex" justifyContent="center" padding={`20px`}>
                <Paragraph
                  color={Colors.gray}
                  fontSize="18px"
                  fs_sm="14px"
                  lineHeight="20px"
                  margin="20px 0 0 0"
                  align="left"
                >
                  {yml.about.content}
                </Paragraph>
              </Div>
              <Div display="flex" justifyContent="around" padding={`10px`}>
                <Link to={yml.about.button_link}>
                  <Paragraph
                    color={Colors.blue}
                    fontSize="20px"
                    fs_sm="18px"
                    lineHeight="20px"
                    margin="20px 0 0 0"
                    align="left"
                  >
                    {yml.about.button}
                  </Paragraph>
                </Link>
              </Div>
            </Div>
            <Div
              size="6"
              size_sm={`12`}
              paddingLeft={`0`}
              paddingRight={`0`}
              borderRadius="0 1.25rem 1.25rem 0"
            >
              <StyledBackgroundSection
                className={`img-right`}
                height={`426px`}
                image={
                  yml.about.about_image.image.childImageSharp.gatsbyImageData
                }
                bgSize={`cover`}
                alt={yml.about.about_image.alt}
                borderRadius={`0 1.25rem 1.25rem 0`}
              />
            </Div>
          </Div>
        </Card>
      </Div>
      <Divider height="90px" />
    </Div>
  );
};
export const query = graphql`
  query AlumniQuery($file_name: String!, $lang: String!) {
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
          banner {
            tagline
            sub_heading
          }
          about {
            heading
            sub_heading
            about_image {
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 800
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                  # fluid(maxWidth: 800){
                  #   ...GatsbyImageSharpFluid_withWebp
                  # }
                }
              }
              alt
            }
            content
            button
            button_link
          }
        }
      }
    }
    allAlumniProjectsYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          header {
            tagline
            sub_heading
          }
          projects {
            project_name
            slug
            project_image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 800
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
                # fluid(maxWidth: 800){
                #   ...GatsbyImageSharpFluid_withWebp
                # }
              }
            }
            project_content
            project_video
            live_link
            github_repo
            alumni {
              first_name
              last_name
              job_title
              github
              linkedin
              twitter
            }
          }
          button_section {
            button_text
            button_link
          }
        }
      }
    }
  }
`;
export default BaseRender(Graduates);
