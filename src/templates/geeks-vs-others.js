import React from "react";
import { isCustomBarActive } from "../actions";
import { Header } from "../components/Sections";
import GeeksVsOthers from "../components/GeeksVsOthers";
import BaseRender from "./_baseLayout";
import { graphql } from "gatsby";
import { SessionContext } from "../session";

const View = (props) => {
  const { data, pageContext, yml } = props;
  const { session } = React.useContext(SessionContext);
  return (
    <>
      <Header
        margin="10px 0 0 0"
        margin_md={isCustomBarActive(session) ? "120px 0 40px 0" : "70px 0 40px 0"}
        seo_title={yml.seo_title}
        title={yml.header.title}
        paragraph={yml.header.paragraph}
      />
      <GeeksVsOthers lang={pageContext.lang} link={false} />
    </>
  );
};
export const query = graphql`
  query GeeksQuery($file_name: String!, $lang: String!) {
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
        }
      }
    }
  }
`;
export default BaseRender(View);
