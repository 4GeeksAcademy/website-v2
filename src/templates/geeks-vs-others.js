import React from "react";
import { isCustomBarActive } from "../actions";
import { Header } from "../components/Sections";
import GeeksVsOthers from "../components/GeeksVsOthers";
import BaseRender from "./_baseLayout";
import { graphql } from "gatsby";
import { SessionContext } from "../session";
import TwoColumn from "../components/TwoColumn/index.js";
import { Div } from "../components/Sections";
import { Colors } from "../components/Styling";
import { H2 } from "../components/Heading";


const View = (props) => {
  const { data, pageContext, yml } = props;
  const { session } = React.useContext(SessionContext);

  return (
    <>
      <Header
        margin="10px 0 0 0"
        margin_md={
          isCustomBarActive(session) ? "120px 0 40px 0" : "70px 0 40px 0"
        }
        fontFamily={"Archivo-Black"}
        seo_title={yml.seo_title}
        title={yml.header.title}
        paragraph={
          <>
            <span
              style={{
                display: "block",
                fontFamily: "Lato, sans-serif",
                fontWeight: "300",
                color: "#606060",
                marginBottom: "16px",
                fontSize: "26px",
              }}
            >
              {yml.header.sub_title}
            </span>
            <span
              style={{
                fontFamily: "Roboto, sans-serif",
                color: "#424242",
                lineHeight: "1.5",
                fontSize: "22px",
              }}
              dangerouslySetInnerHTML={{ __html: yml.header.paragraph }}
            />
          </>
        }
      />

      {/* Section Title */}
      <Div display="block" >
        <H2 type="h2" textAlign_tablet="center">
          {yml.section_heading?.text}
        </H2>
      </Div>


      <GeeksVsOthers lang={pageContext.lang} link={false} />

      {/* first twocolumns */}
      <Div display="block" background={Colors.veryLightBlue3} padding="40px 0">
        <H2 type="h2" textAlign_tablet="center">
          {yml.two_columns.section_heading.text}
        </H2>
        <TwoColumn
          left={{ image: yml.two_columns?.image, video: yml.two_columns?.video }}
          right={{
            sub_heading: yml.two_columns?.sub_heading,
            bullets: yml.two_columns?.bullets,
            content: yml.two_columns?.content,
            button: yml.two_columns?.button,
          }}
          proportions={yml.two_columns?.proportions}
          session={session}
          />
        <TwoColumn
          right={{ image: yml.two_columns_first?.image, video: yml.two_columns_first?.video }}
          left={{
            bullets: yml.two_columns_first?.bullets,
            button: yml.two_columns_first?.button,
          }}
          proportions={yml.two_columns_first?.proportions}
          session={session}
        />
      </Div>

      {/* second twocolumns */}
      <TwoColumn
        left={{ image: yml.two_columns_second?.image, video: yml.two_columns_second?.video }}
        right={{
          heading: yml.two_columns_second?.heading,
          sub_heading: yml.two_columns_second?.sub_heading,
          bullets: yml.two_columns_second?.bullets,
          content: yml.two_columns_second?.content,
          button: yml.two_columns_second?.button,
        }}
        proportions={yml.two_columns_second?.proportions}
        session={session}
      />

      {/* two_columns_third */}
      <TwoColumn
        left={{
          heading: yml.two_columns_third?.heading,
          sub_heading: yml.two_columns_third?.sub_heading,
          bullets: yml.two_columns_third?.bullets,
          content: yml.two_columns_third?.content,
          button: yml.two_columns_third?.button,
        }}
        right={{
          image: yml.two_columns_third?.image,
          video: yml.two_columns_third?.video,
        }}
        proportions={yml.two_columns_third?.proportions}
        session={session}
      />
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
            sub_title
            paragraph
          }
          section_heading {
            text
          }
          two_columns {
            proportions
            image {
              style
              src
              shadow
            }
            section_heading {
              text
            }
            sub_heading {
              text
              font_size
              style
            }
            content {
              text
              style
            }
            bullets {
              items {
                heading
                text
                icon
                icon_color
              }
            }
          }
          two_columns_first {
            proportions
            image {
              style
              src
              shadow
            }
            bullets {
              items {
                heading
                text
                icon
                icon_color
              }
            }
          }
          two_columns_second {
            proportions
            image {
              style
              src
              shadow
            }
            heading {
              text
              font_size
              style
            }
            sub_heading {
              text
              font_size
              style
            }
            content {
              text
              style
            }
            bullets {
              items {
                heading
                text
                icon
              }
            }
            button {
              text
              color
              background
              path
            }
          }
          two_columns_third {
            proportions
            image {
              style
              src
            }
            heading {
              text
              font_size
              style
            }
            sub_heading {
              text
              font_size
              style
            }
            content {
              text
              style
            }
            bullets {
              items {
                text
                icon
              }
            }
            button {
              text
              color
              background
              path
            }
          }
        }
      }
    }
  }
`;
export default BaseRender(View);
