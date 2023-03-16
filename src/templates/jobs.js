import React from "react";
import { Header } from "../components/Sections";
import BaseRender from "./_baseLayout";
import JobInfo from "../components/JobInfo";
import { isCustomBarActive } from "../actions";
import { SessionContext } from "../session";

const Jobs = ({ data, pageContext, yml }) => {
  const { session } = React.useContext(SessionContext);
  const { lang } = pageContext;

  return (
    <>
      <Header
        seo_title={yml.seo_title}
        title={yml.header.title}
        margin={isCustomBarActive(session) ? "120px 0 0 0" : "70px 0 0 0"}
        paragraph={yml.header.paragraph}
        padding_tablet="72px 0 40px 0"
      />
      <JobInfo lang={lang} />
    </>
  );
};
export const query = graphql`
  query JobsQuery($file_name: String!, $lang: String!) {
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
          }
        }
      }
    }
  }
`;
export default BaseRender(Jobs);

{
  /* <WrapperImage

imageData={yml.header.image && yml.header.image.childImageSharp.fluid}
className={`img-header`}
height={`300px`}
bgSize={`cover`}
border="bottom"
customBorderRadius="0 0 0 1.25rem"
paddingRight={`0`}
>
<Divider height="100px" />
<Title
  size="5"
  title={yml.header.tagline}
  variant="main"
  color={Colors.white}
  fontSize="46px"
  textAlign="center"
/>
</WrapperImage>
<Wrapper
>
<JobInfo />
</Wrapper>
<Divider height="50px" />
<Wrapper
height="400px"
github={`/page/jobs.${pageContext.lang}.yml`}
>
<Title
  title={yml.about.heading}
  variant="primary"
  size="8"
  paragraph={yml.about.sub_heading}
/>
<Row display="flex">
  <Column
    size="12"
    borderRadius="0 0 0 1.25rem"
  >
    <Card shadow borders="1.25rem" height="auto" >
      <Row
        display="flex"
        height="100%"
        marginLeft="0"
        marginRight="0"
        customRespSize
      >
        <Column
          size="6"
          size_sm={`12`}
          paddingLeft={`0`}
          paddingRight={`0`}
          borderRadius="0 1.25rem 1.25rem 0"
        >
          <StyledBackgroundSection
            className={`img-right`}
            height={`426px`}
            image={yml.about.about_image.image.childImageSharp.fluid}
            bgSize={`cover`}
            alt={yml.about.about_image.alt}
            borderRadius={`1.25rem 0 0 1.25rem`}
          />
        </Column>
        <Column size="6" size_sm={`12`} alignSelf="center" height="100%" borderRadius="0 0 0 1.25rem">
          <Row display="flex" justifyContent="center" padding={`20px`}>
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
          </Row>
          <Row display="flex" justifyContent="around" padding={`10px`}>
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
              </Paragraph></Link>
          </Row>
        </Column>
      </Row>
    </Card>
  </Column>
</Row>
</Wrapper>

<Divider height="480px" /> */
}
