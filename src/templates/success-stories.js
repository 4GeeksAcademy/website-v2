import React from "react";
import { graphql } from "gatsby";
import { Header, Div } from "../components/Sections";
import { Colors, Img } from "../components/Styling";
import SuccessStoriesComponent from "../components/SuccessStories";
import OurPartners from "../components/OurPartners";
import BaseRender from "./_baseLayout";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { isCustomBarActive } from "../actions";
import { SessionContext } from "../session";

const SuccessStories = (props) => {
  const { data, pageContext, yml } = props;
  const { session } = React.useContext(SessionContext);
  const partnersData = data.allPartnerYaml.edges[0].node;

  return (
    <>
      {yml.header && (
        <Header
          paragraphMargin="26px 20px"
          paragraphMargin_Tablet="26px 10%"
          paddingParagraph_tablet="0 40px"
          seo_title={yml.seo_title}
          title={yml.header.title}
          paragraph={yml.header.paragraph}
          fontFamily_title="Archivo-Black"
          uppercase
          margin={
            isCustomBarActive(session)
              ? "120px auto 24px auto"
              : "70px auto 24px auto"
          }
          position="relative"
          zIndex="1"
        >
          <Img
            src="/images/slash-light.png"
            width="44px"
            height="121px"
            style={{
              position: "absolute",
              right: "16%",
              top: "9%",
              zIndex: "-1",
            }}
            display_xxs="none"
            display_tablet="flex"
          />
          <Img
            src="/images/Vector-right-large.png"
            width="89px"
            height="121px"
            style={{
              position: "absolute",
              right: "4%",
              top: "3%",
              zIndex: "-1",
            }}
          />
          <Img
            src="/images/Group-6594-e.png"
            width="42px"
            height="250px"
            style={{
              position: "absolute",
              zIndex: "-1",
              transform: "rotate(90deg)"
            }}
            right_lg="11%"
            right_tablet="21%"
            bottom_tablet="-20%"
            bottom_md="-25%"
            display_xxs="none"
            display_tablet="flex"
          />
          <Img
            src="/images/Vector-light.png"
            width="164px"
            height="222px"
            style={{
              position: "absolute",
              left: "4%",
              top: "0%",
              zIndex: "-1",
            }}
          />
        </Header>
      )}

      <SuccessStoriesComponent
        lang={pageContext.lang}
        filterIndexes={yml.filter_indexes}
      />

      <Div 
        maxWidth="1366px" 
        margin="0 auto"
        padding_xxs="80px 20px"
        padding_md="50px 10%"
        padding_lg="60px 10%"
        padding_tablet="40px 40px"
      >
        <OurPartners
          fontSize="15px"
          padding="0"
          margin="0"
          gridTemplateColumns="repeat(14, 1fr)"
          gridColumn="1/15"
          images={yml.images}
          title={yml.partners.title}
          //paragraph={partnersData.partners.sub_heading}
          showFeatured={false}
          props={partnersData.partners}
          gray={true}
        />
      </Div>
    </>
  );
};
export const query = graphql`
  query SuccessQuery($file_name: String!, $lang: String!) {
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
          }
          partners{
            title
          }
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
            }
            tagline
            sub_heading
            footer_button
            footer_link
          }
        }
      }
    }
  }
`;
export default BaseRender(SuccessStories);
