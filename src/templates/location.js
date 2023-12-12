import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import { graphql, Link } from "gatsby";
import process from "process";
import ChooseProgram from "../components/ChooseProgram";
import Badges from "../components/Badges";
import Loc from "../components/Loc";
import OurPartners from "../components/OurPartners";
import { isCustomBarActive } from "../actions";
import ChooseYourProgram from "../components/ChooseYourProgram";
import UpcomingDates from "../components/UpcomingDates";
import Staff from "../components/Staff";
import "dayjs/locale/de";
import {
  Div,
  GridContainerWithImage,
  GridContainer,
  Divider,
} from "../components/Sections";
import { H1, H2, H3, Paragraph } from "../components/Heading";
import { Colors, StyledBackgroundSection } from "../components/Styling";
import BaseRender from "./_baseLayout";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Icon from "../components/Icon";
import { SessionContext } from "../session";
import JobGuaranteeSmall from "../components/JobGuaranteeSmall";
import RelatedPosts from "../components/RelatedPosts";
import FaqCard from "../components/FaqCard";

const MapFrame = lazy(() => import("../components/MapFrame"));

const Location = ({ data, pageContext, yml }) => {
  const { lang } = pageContext;
  const { session } = React.useContext(SessionContext);
  const hiring = data.allPartnerYaml.edges[0].node;
  const images = data.allLocationYaml.edges[0].node;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    process.nextTick(() => {
      if (globalThis.window ?? false) {
        setReady(true);
      }
    });
    // setTimeout(() => { setReady(true) }, 3000
  }, []);
  const chooseProgramRef = useRef(null);

  const goToChooseProgram = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: chooseProgramRef.current?.offsetTop,
      behavior: "smooth",
    });
  };

  const open = {
    us: "Open on Maps",
    es: "Abrir en Mpas",
  };
  const chooseButton = {
    us: "CHOOSE PROGRAM",
    es: "SELECCIONAR PROGRAMA",
  };

  return (
    <>
      <GridContainerWithImage
        padding="0"
        padding_tablet="0 0 20px 0"
        columns_tablet="14"
        margin={isCustomBarActive(session) ? "138px auto 30px auto" : "72px auto 30px auto"}
        margin_md={isCustomBarActive(session) ? "120px auto 30px auto" : "72px auto 30px auto"}
      >
        <Div
          flexDirection="column"
          justifyContent_tablet="start"
          padding_tablet="70px 0 0 0"
          padding={isCustomBarActive(session) ? "50px 25px 0 25px" : "0 25px"}
          gridColumn_tablet="1 / 7"
        >
          <H1 type="h1" textAlign="left" margin="0 0 11px 0" color="#606060">
            {yml.seo_title}
          </H1>
          <H2 textAlign="left" fontSize="50px" lineHeight="60px">
            {`${yml.header.tagline}`}
          </H2>
          <H3 textAlign="left" type="h3" margin="15px 0 25px 0">
            {yml.header.sub_header}
            <span style={{ color: Colors.blue }}>
              {yml.header.sub_header_highlighted}
            </span>
          </H3>
          <ChooseProgram
            goTo={goToChooseProgram}
            right="15px"
            top="40px"
            textAlign="center"
            textAlign_tablet="left"
            openLabel={chooseButton[lang]}
            closeLabel={chooseButton[lang]}
          />
          {yml.info_box.address && (
            <Div
              alignItems="flex-start"
              margin="15px 0 0 0"
              margin_tablet="26px 0 0 0"
            >
              <Icon
                icon="location"
                style={{ marginRight: "10px", flexShrink: 0 }}
              />
              <Paragraph
                textAlign="left"
                opacity="1"
                fontWeight="700"
                lineHeight="22px"
                width="100%"
              >
                {yml.info_box.address}
                {!yml.info_box.address.includes("Only remotely") && (
                  <Link
                    target="_blank"
                    to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      yml.info_box.address
                    )}`}
                    style={{ marginLeft: "5px", display: "inline" }}
                  >
                    {open[lang]}
                  </Link>
                )}
              </Paragraph>
            </Div>
          )}
          <Div
            display_tablet="flex"
            display="block"
            margin_tablet="0"
            margin="0 0 20px 0"
          >
            {(yml.phone || yml.info_box.whatsapp) && (
              <Paragraph
                textAlign_tablet="left"
                margin="15px 10px 0 0"
                margin_tablet="26px 10px 0 0"
                opacity="1"
                display="flex"
                alignItems="center"
                fontWeight="700"
                lineHeight="22px"
                maxWidth="155px"
                flexShrink="0"
              >
                {yml.info_box.whatsapp && yml.info_box.whatsapp_link ? (
                  <>
                    <Icon
                      icon="whatsapp"
                      width="20px"
                      style={{ marginRight: "10px", flexShrink: 0 }}
                    />
                    <a
                      href={yml.info_box.whatsapp_link}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                    >
                      {yml.info_box.whatsapp}
                    </a>
                  </>
                ) : (
                  <>
                    <Icon
                      icon="phone"
                      style={{ marginRight: "10px", flexShrink: 0 }}
                    />
                    {yml.phone || yml.info_box.whatsapp}
                  </>
                )}
              </Paragraph>
            )}
            {yml.info_box.email && (
              <Paragraph
                textAlign_tablet="left"
                margin="15px 0 0 0"
                margin_tablet="26px 0 0 0"
                opacity="1"
                display="flex"
                alignItems="center"
                fontWeight="700"
                lineHeight="22px"
              >
                <Icon
                  icon="mail"
                  style={{ marginRight: "10px", flexShrink: 0 }}
                />
                {yml.info_box.email}
              </Paragraph>
            )}
          </Div>

          {/* <Paragraph textAlign_tablet="left">{yml.info_box.phone} </Paragraph>
          {yml.info_box.whatsapp && (
            <Paragraph
              justifyContent="center"
              justifyContent_tablet="start"
              textAlign_tablet="left"
              display="flex"
              alignItems="center"
            >
              {yml.info_box.whatsapp_link ? (
                <>
                  <Div
                    width="22px"
                    height="22px"
                    alignItems="center"
                    margin="0 8px 0 0"
                  >
                    <Icon icon="whatsapp" />
                  </Div>
                  Whatsapp:
                  <a
                    href={yml.info_box.whatsapp_link}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    {yml.info_box.whatsapp}
                  </a>
                </>
              ) : (
                `Whatsapp: ${yml.info_box.whatsapp}`
              )}
            </Paragraph>
          )}
          <Paragraph textAlign_tablet="left" margin="0 0 30px 0">
            {yml.info_box.email}{" "}
          </Paragraph> */}
        </Div>
        <Div
          height="auto"
          width="100%"
          gridColumn_tablet="7 / 15"
          style={{ position: "relative" }}
        >
          <StyledBackgroundSection
            height_tablet="495px"
            height_sm="280px"
            height="180px"
            image={yml.header.image.childImageSharp.gatsbyImageData}
            bgSize="contain"
            alt={yml.header.alt}
          />
        </Div>
      </GridContainerWithImage>
      {data.allJobGuaranteeSmallYaml.edges[0].node.locations.includes(
        yml.breathecode_location_slug
      ) && (
        <JobGuaranteeSmall
          content={data.allJobGuaranteeSmallYaml.edges[0].node}
        />
      )}

      <Badges
        lang={pageContext.lang}
        background={Colors.verylightGray}
        paragraph={yml.badges.paragraph}
        margin="0 0 57px 0"
        padding="27px 17px 50px 17px"
        padding_tablet="80px 0 100px 0"
      />
      <GridContainer
        columns_tablet="12"
        padding_tablet="60px 0 77px 0"
        padding="40px 17px"
      >
        <Div gridColumn_tablet="1 / 4">
          <H2 textAlign="left">{images.images_box.heading}</H2>
        </Div>
        <Div flexDirection="column" gridColumn_tablet="5 / 13">
          {images.images_box.content.split("\n").map((m, i) => (
            <Paragraph
              key={i}
              textAlign="left"
              margin="0 0 20px 0"
              fontSize="15px"
              lineHeight="26px"
            >
              {m}
            </Paragraph>
          ))}
        </Div>
      </GridContainer>
      {yml.images_box.images && (
        <GridContainer
          columns_tablet="10"
          gridTemplateRows_tablet="repeat(4, 1fr)"
          gridTemplateAreas={`
        'image1 image1 image1 image1 image1 image1 image1 image2 image2 image2'
        'image1 image1 image1 image1 image1 image1 image1 image2 image2 image2'
        'image3 image3 image3 image3 image5 image5 image5 image5 image5 image5'
        'image4 image4 image4 image4 image5 image5 image5 image5 image5 image5'
        `}
          gridTemplateAreas_tablet={`
          'image1 image1 image1 image1 image1 image1 image1 image2 image2 image2'
          'image1 image1 image1 image1 image1 image1 image1 image2 image2 image2'
          'image3 image3 image3 image3 image5 image5 image5 image5 image5 image5'
          'image4 image4 image4 image4 image5 image5 image5 image5 image5 image5'
          `}
          height_tablet="813px"
          height="304px"
          childHeight="inherit"
        >
          {yml.images_box.images.map((m, i) => {
            return (
              <GatsbyImage
                style={{ gridArea: `image${i + 1}`, borderRadius: "3px" }}
                key={i}
                image={getImage(m.path.childImageSharp.gatsbyImageData)}
                alt={m.alt}
              />
            );
          })}
        </GridContainer>
      )}
      <OurPartners
        images={hiring.partners.images}
        showFeatured
        marquee
        title={hiring.partners.tagline}
        paragraph={hiring.partners.sub_heading}
      />
      <ChooseYourProgram
        chooseProgramRef={chooseProgramRef}
        lang={pageContext.lang}
        programs={data.allChooseYourProgramYaml.edges[0].node.programs}
      />
      <UpcomingDates
        lang={pageContext.lang}
        location={yml.breathecode_location_slug}
        locations={data.allLocationYaml.edges}
        message={yml.upcoming.no_dates_message}
        actionMessage={yml.upcoming.actionMessage}
      />
      <Staff lang={pageContext.lang} />

      {/* IFRAME map */}
      <Div>
        {!ready ? (
          <H1>Loading Map...</H1>
        ) : (
          <Suspense fallback={<H1>Loading Map...</H1>}>
            {yml.info_box.iframeMapUrl === "" ? null : (
              <MapFrame
                src={ready ? yml.info_box.iframeMapUrl : "about:blank"}
                width="100%"
                height="492px"
              />
            )}
          </Suspense>
        )}
      </Div>
      <GridContainer
        padding="0 4%"
        gridGap="0px"
        padding_tablet="0 20%"
        padding_lg="0 26%"
      >
        <FaqCard
          faqs={data.allFaqYaml.edges[0].node.faq}
          topicSlug="enrollment"
          minPriority="1"
          // locationSlug={yml.breathecode_location_slug}
        />
      </GridContainer>
      <Divider height="50px" />
      <RelatedPosts
        lang={pageContext.lang}
        posts={data.allMarkdownRemark.edges}
        relatedClusters={yml.meta_info.related_clusters}
      />
      <Loc lang={pageContext.lang} allLocationYaml={data.test} />
    </>
  );
};

export const query = graphql`
  query LocationQuery(
    $file_name: String!
    $lang: String!
    $related_clusters: [String]
  ) {
    allLocationYaml(
      filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang } } }
    ) {
      edges {
        node {
          seo_title
          active_campaign_location_slug
          name
          breathecode_location_slug
          latitude
          longitude
          phone
          header {
            tagline
            paragraph
            sub_heading
            sub_header
            sub_header_highlighted
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 1200
                  quality: 100
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
            alt
          }
          button_header {
            button_text
            button_link
          }
          button {
            apply_button_link
            apply_button_text
            cohort_more_details_text
            syllabus_button_text
            syllabus_submit_text
          }
          badges {
            title
            paragraph
          }
          news {
            title
          }
          upcoming {
            no_dates_message
            actionMessage
          }
          info_box {
            heading
            map_url
            address
            iframeMapUrl
            phone
            email
            contact_heading
            whatsapp
            whatsapp_link
            open_on_maps
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 800
                  quality: 100
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
            alt
          }
          meta_info {
            title
            description
            image
            keywords
            related_clusters
          }
          images_box {
            heading
            content
            images {
              path {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 800
                    quality: 100
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
              alt
            }
          }
        }
      }
    }
    test: allLocationYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          city
          name
          meta_info {
            slug
            title
            description
            visibility
            position
            image
            keywords
            region
          }
          seo_title
          online_available
          active_campaign_location_slug
          breathecode_location_slug
          header {
            sub_heading
            tagline
            alt
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 800
                  quality: 100
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
          }
          info_box {
            heading
            address
            contact_heading
            phone
            email
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 800
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
          }
          images_box {
            images {
              path {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 100
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                }
              }
              alt
            }
            content
            heading
          }
        }
      }
    }
    allMarkdownRemark(
      limit: 4
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { cluster: { in: $related_clusters } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            type
            pagePath
          }
          frontmatter {
            author
            date
            image
            slug
            title
            excerpt
            featured
            status
            cluster
          }
        }
      }
    }
    allFaqYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          faq {
            topic
            slug
            questions {
              locations
              priority
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
    allChooseYourProgramYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          programs {
            link
            sub_title
            title
            description
            icon
            comming_soon
            text_link
          }
        }
      }
    }
    allJobGuaranteeSmallYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          title
          locations
          icons {
            title
            icon
          }
          link {
            url
            label
          }
        }
      }
    }
    allPartnerYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          partners {
            tagline
            sub_heading
            footer_tagline
            footer_button
            footer_link
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

export default BaseRender(Location);
