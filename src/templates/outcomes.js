import React, { useCallback, useState } from "react";
import { graphql } from "gatsby";
import { Div, Header, GridContainer } from "../components/Sections";
import { H2, H3, H4, Paragraph } from "../components/Heading";
import { Colors, Button } from "../components/Styling";
import { Charts } from "../components/Chart";
import BaseRender from "./_baseLayout";
import { StyledBackgroundSection } from "../components/Styling";
import Modal from "../components/Modal";
import LeadForm from "../components/LeadForm";
import { outcomesReport } from "../actions";
import { SessionContext } from "../session";
import { isCustomBarActive } from "../actions";
import ScrollSpy from "../components/ScrollSpy";

const SVGImage = () => (
  <svg
    width="510"
    height="295"
    viewBox="0 0 510 295"
    fill="none"
    xmlns="https:://www.w3.org/2000/svg"
  >
    <path
      d="M73.5 280L179.5 136L226 187L393 17.5L473 111"
      stroke="#0097CD"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path d="M33 44V294H509" stroke="#A4A4A4" strokeLinecap="round" />
    <circle cx="58" cy="194" r="58" fill="#FFB718" />
    <circle cx="228" cy="128" r="14" fill="#FFB718" />
    <circle cx="177.5" cy="55.5" r="26.5" fill="#0097CD" />
    <circle cx="316.5" cy="8.5" r="8.5" fill="#FFB718" fillOpacity="0.2" />
    <circle cx="348.5" cy="63.5" r="8.5" fill="#FFB718" fillOpacity="0.2" />
    <circle
      cx="426.5"
      cy="27.5"
      r="8.5"
      transform="rotate(90 426.5 27.5)"
      fill="#FFB718"
      fillOpacity="0.2"
    />
    <circle cx="316.5" cy="43.5" r="8.5" fill="black" />
    <circle cx="348.5" cy="98.5" r="8.5" fill="black" />
    <circle
      cx="500.5"
      cy="276.5"
      r="8.5"
      transform="rotate(90 500.5 276.5)"
      fill="black"
    />
    <circle cx="316.5" cy="98.5" r="8.5" fill="#FFB718" fillOpacity="0.2" />
    <circle cx="348.5" cy="141.5" r="8.5" fill="#FFB718" fillOpacity="0.2" />
    <circle
      cx="348.5"
      cy="27.5"
      r="8.5"
      transform="rotate(90 348.5 27.5)"
      fill="#FFB718"
      fillOpacity="0.2"
    />
    <circle cx="316.5" cy="141.5" r="8.5" fill="#FFB718" fillOpacity="0.2" />
    <circle cx="348.5" cy="178.5" r="8.5" fill="#FFB718" fillOpacity="0.2" />
    <circle cx="316.5" cy="243.5" r="8.5" fill="#0097CD" />
    <circle cx="348.5" cy="277.5" r="8.5" fill="#FFB718" fillOpacity="0.2" />
    <rect
      x="398"
      y="76"
      width="77"
      height="11"
      rx="5.5"
      transform="rotate(90 398 76)"
      fill="black"
    />
    <rect
      x="278"
      y="209"
      width="77"
      height="11"
      rx="5.5"
      transform="rotate(90 278 209)"
      fill="black"
    />
    <rect
      x="183"
      y="209"
      width="77"
      height="11"
      rx="5.5"
      transform="rotate(90 183 209)"
      fill="black"
    />
    <rect
      x="398"
      y="167"
      width="119"
      height="11"
      rx="5.5"
      transform="rotate(90 398 167)"
      fill="black"
    />
    <rect
      x="433"
      y="167"
      width="119"
      height="11"
      rx="5.5"
      transform="rotate(90 433 167)"
      fill="black"
    />
    <rect
      x="470"
      y="220"
      width="66"
      height="11"
      rx="5.5"
      transform="rotate(90 470 220)"
      fill="black"
    />
    <circle cx="392.5" cy="17.5" r="13.5" fill="#CD0000" />
  </svg>
);

const Outcomes = ({ data, pageContext, yml }) => {
  const { session } = React.useContext(SessionContext);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const convertToSlug = (convertText) => {
    return convertText
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  return (
    <>
      <Div
        background={Colors.lightYellow}
        padding="40px 20px"
        padding_tablet="0px"
      >
        <Header
          hideArrowKey
          paddingParagraph="0px 14% 0px 0"
          textAlign_tablet="left"
          seo_title={yml.seo_title}
          title={yml.header.title}
          paragraph={yml.header.paragraph}
          svg_image={<SVGImage />}
          margin_tablet="70px auto 0 auto"
          maxWidth="1366px"
        />
      </Div>
      <Div
        padding="40px 20px"
        padding_md="40px 80px"
        padding_lg="40px 0px"
        padding_tablet="40px 40px"
        // padding="0 0 50px 0"
        flexDirection="column"
      >
        <Div
          display="flex"
          display_tablet="none"
          margin="0 0 0 -17px"
          background={Colors.white}
          style={{
            borderBottom: "1px solid #EBEBEB",
            overflowX: "auto",
            zIndex: "999",
            position: "sticky",
            top: `${isCustomBarActive(session) ? "50px" : "0"}`,
          }}
          padding="0 35px"
          alignItems="center"
          flexDirection="row"
          gap="40px"
          width="100%"
          height="70px"
          className="scroll-spy-container"
        >
          <ScrollSpy offsetTop={140} autoScrollOffsetTop={-140}>
            {yml.sections
              .filter((i) => i.title !== "")
              .map((m) => (
                <button
                  key={convertToSlug(m.title)}
                  width="auto"
                  padding="0 20px"
                  href={`#${convertToSlug(m.title)}`}
                  ref={React.createRef()}
                >
                  <Paragraph textTransform="uppercase" width="max-content">
                    {m.title}
                  </Paragraph>
                </button>
              ))}
          </ScrollSpy>
        </Div>

        <GridContainer
          columns="12"
          gridColumn_tablet="1 / span 13"
          padding="0 0"
          padding_tablet="0 0 0 0 "
          maxWidth="1366px"
          margin_tablet="0 auto"
        >
          <Div gridArea="1/1/1/12" flexDirection="column">
            {yml.sections
              .filter((section) => section.title !== "")
              .map((section, i) => {
                return (
                  <React.Fragment key={i}>
                    <Div>
                      <H2
                        id={convertToSlug(section.title)}
                        type="h2"
                        padding="10px 0"
                        margin="54px 0 0 0 "
                        textAlign="left"
                      >
                        {section.title}
                      </H2>
                    </Div>
                    <Div
                      style={{
                        margin: "20px 0",
                        height: "1px",
                        background: "#c4c4c4",
                      }}
                    />
                    {section.paragraph.split("\n").map((m, i) => (
                      <Paragraph
                        key={i}
                        letterSpacing="0.05em"
                        textAlign="left"
                        margin="10px 0"
                      >
                        {m}
                      </Paragraph>
                    ))}
                    <GridContainer
                      justifyContent="between"
                      gridGap_tablet="30px"
                      containerColumns_tablet={`0fr repeat(12, 1fr) 1fr`}
                      columns_tablet={
                        Array.isArray(section.stats) && section.stats.length
                      }
                      margin="41px 0 0 0"
                    >
                      {section.stats.map((m, i) => {
                        return (
                          <Div
                            key={i}
                            gridColumnGap="40px"
                            flexDirection="column"
                            margin="0 0 38px 0"
                            gap="10px"
                          >
                            <H2
                              type="h2"
                              textAlign_tablet="left"
                              color={Colors.blue}
                            >
                              {m.stat}
                            </H2>
                            <H3 type="h3" textAlign_tablet="left">
                              {m.content}
                            </H3>
                          </Div>
                        );
                      })}
                    </GridContainer>
                    {Array.isArray(section.sub_sections) &&
                      section.sub_sections
                        .filter((section) => section.title !== "")
                        .map((m, i) => {
                          return (
                            <React.Fragment key={i}>
                              <H4
                                type="h4"
                                textAlign="left"
                                textTransform="uppercase"
                                fontWeight="700"
                                margin="42px 0 13px 0"
                              >
                                {m.title}
                              </H4>
                              <Paragraph
                                letterSpacing="0.05em"
                                textAlign="left"
                                margin_md="10px 0"
                                dangerouslySetInnerHTML={{ __html: m.content }}
                              ></Paragraph>
                              {Array.isArray(m.image_section) &&
                                m.image_section.map((m, i) => {
                                  return (
                                    <React.Fragment key={i}>
                                      <StyledBackgroundSection
                                        margin="30px 0"
                                        minHeight={`100px`}
                                        height={`255px`}
                                        width="100%"
                                        image={
                                          m.image &&
                                          m.image.childImageSharp
                                            .gatsbyImageData
                                        }
                                        bgSize={`contain`}
                                      />

                                      <Paragraph
                                        justifyContent="center"
                                        padding="50px 0 0"
                                        display="none"
                                        display_tablet="flex"
                                        textAlign="left"
                                      >
                                        {m.image_paragraph}
                                      </Paragraph>
                                      <GridContainer
                                        columns_tablet="3"
                                        justifyContent="center"
                                        justifyContent_tablet="center"
                                        gridTemplateColumns_tablet="3"
                                      >
                                        {m.chart &&
                                          yml.charts.chart_list.map((c, i) => {
                                            return (
                                              <Div
                                                flexDirection="column"
                                                key={i}
                                              >
                                                <Charts dataArray={c.data} />
                                                <H4
                                                  textTransform="uppercase"
                                                  fontSize="15px"
                                                  lineHeight="19px"
                                                  fontWeight="900"
                                                >
                                                  {c.title}
                                                </H4>
                                              </Div>
                                            );
                                          })}
                                      </GridContainer>
                                    </React.Fragment>
                                  );
                                })}
                            </React.Fragment>
                          );
                        })}
                  </React.Fragment>
                );
              })}
          </Div>
          <Div
            gridArea="1/9/1/13"
            gridColumn_tablet="1 ​/ span 1"
            margin="54px 0 0 0"
            display="none"
            display_md="flex"
            style={{ position: "relative" }}
          >
            <Div
              flexDirection="column"
              position={!open ? "sticky" : "inherit"}
              style={{
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                top: `${isCustomBarActive(session) ? "150px" : "90px"}`,
              }}
              borderRadius="3px"
              border={`1px solid #e5e5e5`}
              width="266px"
              height="fit-content"
            >
              <Div
                className="container-sidebar-content"
                margin="25px 0px 0"
                flexDirection="column"
                justifyContent="space-around"
                gap="8px"
              >
                <ScrollSpy offsetTop={120} autoScrollOffsetTop={-120}>
                  {yml.sections
                    .filter((i) => i.title !== "")
                    .map((m, i) => {
                      return (
                        <button
                          key={convertToSlug(m.title)}
                          href={`#${convertToSlug(m.title)}`}
                          ref={React.createRef()}
                        >
                          <Paragraph
                            cursor="pointer"
                            fontSize="13"
                            transitionSec="3"
                            textAlign="center"
                            textAlign_tablet="left"
                            textTransform="uppercase"
                          >
                            {m.title}
                          </Paragraph>
                        </button>
                      );
                    })}
                </ScrollSpy>
              </Div>

              <Button
                alignSelf="center"
                onClick={handleOpen}
                variant="full"
                width="80%"
                width_tablet="fit-content"
                color={Colors.blue}
                padding="0 16%"
                margin="20px 0 25px 0"
                textColor="white"
              >
                {yml.download.button_text}
              </Button>
              <Modal
                // top="58%"
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
              >
                <LeadForm
                  titleTextAlign="center"
                  style={{ marginTop: "50px" }}
                  heading={yml.download.button_text}
                  motivation={yml.download.motivation}
                  sendLabel={yml.download.label}
                  formHandler={outcomesReport}
                  handleClose={handleClose}
                  lang={pageContext.lang}
                  data={{
                    course: {
                      type: "hidden",
                      value: yml.download_slug,
                      valid: true,
                    },
                  }}
                />
              </Modal>
            </Div>
          </Div>
        </GridContainer>
      </Div>
    </>
  );
};
export const query = graphql`
  query OutcomesQuery($file_name: String!, $lang: String!) {
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
          sections {
            title
            ref
            paragraph
            stats {
              stat
              content
            }
            sub_sections {
              title
              content
              image_section {
                image {
                  childImageSharp {
                    gatsbyImageData(
                      layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                      width: 500
                      quality: 100
                      placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                    )
                  }
                }
                image_paragraph
                chart
              }
            }
          }
          charts {
            chart_list {
              title
              data
            }
          }
          download {
            button_text
            label
            motivation
          }
        }
      }
    }
  }
`;
export default BaseRender(Outcomes);
