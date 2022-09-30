import React, { useState, useContext } from "react";
import { Colors } from "../components/Styling";
import BaseRender from "./_baseLayout";
import { SessionContext } from "../session";

import Link from "gatsby-link";
import Icon from "../components/Icon";
import Card from "../components/Card";
import { Divider, Div, GridContainer, Header } from "../components/Sections";
import { H1, H2, H3, H4, Paragraph } from "../components/Heading";

const Faq = (props) => {
  const { data, pageContext, yml } = props;
  const [buttonToggle, setButtonToggle] = useState(false);
  const [toggleIndex, setToggleIndex] = useState();
  const { session, setSession } = useContext(SessionContext);

  return (
    <>
      <Header
        fontSize="40px"
        seo_title={yml.seo_title}
        title={yml.banner.tagline}
        paragraph={yml.banner.sub_heading}
        // padding_tablet="142px 0 15px 0"
        // padding="142px 0 15px 0"
      />

      <GridContainer
        padding="0 4%"
        gridGap="0px"
        padding_tablet="0 20%"
        padding_lg="0 26%"
        github={`/page/faq.${pageContext.lang}.yml`}
      >
        {yml &&
          yml.faq.map((item, i) => {
            return (
              <React.Fragment key={`${i}-${item.topic}`}>
                <H3
                  type="h3"
                  key={i}
                  borderBottom="1px solid"
                  borderColor="#C4C4C4"
                  padding="80px 30px 30px 30px"
                >
                  {item.topic}
                </H3>
                {item.questions.map((faq, index) => {
                  return (
                    <Card
                      key={`${index}-${faq.question}`}
                      height="auto"
                      width="100%"
                      borders="0"
                      borderBottom="1px solid"
                      borderColor=" #C4C4C4"
                      padding="20px"
                      onClick={() =>
                        toggleIndex === faq.question
                          ? (setToggleIndex(undefined),
                            setButtonToggle(!buttonToggle))
                          : (setToggleIndex(faq.question),
                            setButtonToggle(true))
                      }
                    >
                      <Div key={faq.question} display="block" height="100%">
                        <Div
                          onClick={() => {
                            setButtonToggle(!buttonToggle),
                              setToggleIndex(
                                toggleIndex != undefined
                                  ? undefined
                                  : faq.question
                              );
                          }}
                          display="flex"
                          width="100%"
                          align={`center`}
                          alignSelf="center"
                        >
                          <H4
                            type="h4"
                            textAlign="left"
                            fontSize="13px"
                            align={`left`}
                            align_sm={`left`}
                            color={Colors.black}
                            paddingRight="5%"
                            textTransform="uppercase"
                            fontWeight="700"
                          >
                            {faq.question}
                          </H4>
                          {buttonToggle === false ? (
                            toggleIndex != faq.question && (
                              <Icon icon="plus" width="24" />
                            )
                          ) : buttonToggle === true &&
                            toggleIndex === faq.question ? (
                            <Icon icon="minus" width="24" />
                          ) : (
                            <Icon icon="plus" width="24" />
                          )}
                        </Div>
                        <Div size="12" size_sm="12" alignSelf="center">
                          {buttonToggle === true &&
                            toggleIndex === faq.question && (
                              <Paragraph
                                textAlign="left"
                                letterSpacing="0.05em"
                                lineHeight="22px"
                                fontWeight="normal"
                                dangerouslySetInnerHTML={{ __html: faq.answer }}
                                margin={`20px 0 0 0`}
                                align_sm="left"
                                fontFamily="Lato, sans-serif"
                              ></Paragraph>
                            )}
                        </Div>
                      </Div>
                    </Card>
                  );
                })}
              </React.Fragment>
            );
          })}
      </GridContainer>
      <Divider height="50px" />
    </>
  );
};
export const query = graphql`
  query FaqsQuery($file_name: String!, $lang: String!) {
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
          banner {
            tagline
            sub_heading
            sub_heading_contact
            pathContact
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 1200
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
                # fluid(maxWidth: 1200){
                #   ...GatsbyImageSharpFluid_withWebp
                # }
              }
            }
          }
          faq {
            topic
            questions {
              question
              answer
            }
          }
          fields {
            lang
          }
        }
      }
    }
  }
`;
export default BaseRender(Faq);
