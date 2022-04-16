import React, { useState, useContext } from "react";
import BaseRender from "./_baseLayout";
import {
  Column,
  Wrapper,
  WrapperImage,
  Divider,
  Div,
  Row,
  GridContainer,
  HR,
} from "../components/Sections";
import { H1, H2, H3, H4, Paragraph } from "../components/Heading";
import { Button, Colors, Anchor, RoundImage } from "../components/Styling";
import Icon from "../components/Icon";
import { SessionContext } from "../session.js";
import { isCustomBarActive } from "../actions";
import Link from "gatsby-link";
import LazyLoad from "react-lazyload";

const ThankYou = (props) => {
  const { data, pageContext, yml } = props;
  const { session } = useContext(SessionContext);
  const [checkStatus, setCheckStatus] = useState([
    { label: "facebook", status: false, iconColor: "#166fe5" },
    { label: "twitter", status: false, iconColor: "#1da1f2" },
    { label: "instagram", status: false, iconColor: "#8a3ab9" },
    { label: "meetup", status: false, iconColor: "#f65858" },
  ]);
  let socials = session && session.location ? session.location.socials : [];

  const updateStatus = (index, newvalue) => {
    let g = checkStatus[index];
    g["status"] = newvalue;
    if (index === -1) {
      // handle error
      console.log("no match");
    } else
      setCheckStatus([
        ...checkStatus.slice(0, index),
        g,
        ...checkStatus.slice(index + 1),
      ]);
  };

  const blog_posts = data.featured.edges;
  return (
    <>
      <Div className="circles-left" display="none" display_tablet="inherit">
        <Icon
          icon="landingCircles/smCircle-red"
          width="23px"
          height="23px"
          style={{
            zIndex: 2,
            position: "absolute",
            left: "218px",
            top: "225px",
          }}
        />
        <Icon
          icon="landingCircles/mdCircle-lightBlue"
          style={{ zIndex: 2, position: "absolute", left: "53px", top: "97px" }}
        />
        <Icon
          icon="landingCircles/bigCircle-yellowLight"
          width="115px"
          height="329px"
          style={{ zIndex: 2, position: "absolute", left: "0px", top: "250px" }}
        />
      </Div>
      <Div className="circles-right" display="none" display_tablet="inherit">
        <Icon
          icon="landingCircles/lgCircle-mustard"
          style={{
            zIndex: 2,
            position: "absolute",
            right: "0px",
            top: "269px",
          }}
        />
        <Icon
          icon="landingCircles/mdCircle-blue"
          width="67px"
          height="67px"
          style={{
            zIndex: 2,
            position: "absolute",
            right: "116px",
            top: "169px",
          }}
        />
        <Icon
          icon="landingCircles/smCircle-mustard"
          style={{
            zIndex: 2,
            position: "absolute",
            right: "299px",
            top: "122px",
          }}
        />
      </Div>

      <Div
        flexDirection="column"
        background={Colors.lightYellow}
        padding="68px 0"
        height="auto"
        margin={isCustomBarActive(session) ? "140px 0 0 0" : "80px 0 0 0"}
      >
        <H1
          type="h1"
          zIndex="5"
          fontSize="13px"
          lineHeight="16px"
          fontWeight="700"
          letterSpacing="0.05em"
          color="#606060"
        >
          Coding Bootcamp
        </H1>

        <H2
          type="h2"
          zIndex="5"
          fontSize="48px"
          lineHeight="60px"
          margin="16px 0px 19px 0px"
        >
          {`< ${yml.banner.tagline} >`}
        </H2>

        <H3 type="h3" fontSize="22px" lineHeight="26px" margin="5px 0">
          {yml.content.title}
        </H3>
        {yml.content.message.split("\n").map((m, i) => (
          <Paragraph key={i} align="center">
            {m}
          </Paragraph>
        ))}
      </Div>

      <GridContainer
        flexDirection="column"
        gridColumn_tablet="3 / span 10"
        margin="58px 0 0 0"
      >
        <H3
          type="h3"
          margin="10px 0"
          fontSize="15px"
          lineHeight="22px"
          fontWeight="400"
          letterSpacing="0.05em"
        >
          {yml.social.title}
        </H3>
        <Div margin="15px auto" gap="40px">
          {socials?.map((ln, i) => (
            <Anchor
              key={i}
              cursor="pointer"
              to={ln.link}
              fontSize="13px"
              fontWeight="400"
              style={{
                textTransform: "uppercase",
                lineHeight: "22px",
                textAlign: "left",
              }}
              color={Colors.black}
            >
              {ln.icon && (
                <Icon
                  icon={ln.icon}
                  // style={{ margin: '0 15px 0 0' }}
                  color={Colors.black}
                  fill={Colors.black}
                  height="42px"
                  width="42px"
                />
              )}
            </Anchor>
          ))}
        </Div>
        <HR
          background="none"
          border="1px solid #EBEBEB"
          height="0px"
          margin="30px 0"
        />

        <H3
          type="h3"
          margin="20px 0 40px 0"
          fontSize="15px"
          lineHeight="22px"
          fontWeight="400"
          letterSpacing="0.05em"
        >
          {yml.content.articles_title}
        </H3>

        <GridContainer
          containerColumns_tablet="0fr repeat(12, 1fr) 0fr"
          columns_tablet="3"
        >
          {blog_posts.map((item, i) => {
            return (
              <Div key={i} flexDirection="Column" margin="0 0 87px 0">
                {item.node.frontmatter.image !== "" && (
                  <Link
                    to={`/${pageContext.lang}/${item.node.frontmatter.cluster}/${item.node.frontmatter.slug}`}
                  >
                    <LazyLoad height={10} scroll={true} once={true}>
                      <RoundImage
                        url={
                          item.node.frontmatter.image !== null
                            ? item.node.frontmatter.image
                            : yml.banner.no_image
                        }
                        bsize="cover"
                        border="0px"
                        position="center"
                        width="100%"
                        height="329px"
                      />
                    </LazyLoad>
                  </Link>
                )}

                {/* Boton */}
                <Div
                  flexDirection_md="row"
                  flexDirection="column"
                  justifyContent="left"
                >
                  <Link
                    to={`/${pageContext.lang}/${item.node.frontmatter.cluster}/${item.node.frontmatter.slug}`}
                  >
                    <Button
                      variant="outline"
                      border={`1px solid ${Colors.darkGray}`}
                      color={Colors.darkGray}
                      font='"Lato", sans-serif'
                      margin="20px 10px 20px 0"
                      pointer
                      textColor={Colors.darkGray}
                      fontSize={"13px"}
                    >
                      {item.node.frontmatter.cluster?.replace(/-|_/g, " ") ||
                        "4Geeks"}
                    </Button>
                  </Link>
                </Div>

                {/* Titulo */}
                <Div>
                  <Link
                    to={`/${pageContext.lang}/${item.node.frontmatter.cluster}/${item.node.frontmatter.slug}`}
                  >
                    <H4
                      textAlign="left"
                      align_sm="left"
                      margin="0 0 30px 0"
                      fs_xs="20px"
                      fs_sm="24px"
                      fs_md="16px"
                      fs_lg="20px"
                      fontSize="22px"
                    >
                      {item.node.frontmatter.title}
                    </H4>
                  </Link>
                </Div>

                {/* Comentario acerca del post */}
                <Div>
                  <Paragraph
                    fontWeight="300"
                    fontSize="15px"
                    color="#3A3A3A"
                    textAlign="left"
                    margin="0 0 15px 0"
                  >
                    {item.node.frontmatter.excerpt}
                  </Paragraph>
                </Div>

                {/* Link de leer articulo */}
                <Div>
                  <Paragraph
                    fontSize="13px"
                    color="#0097cd"
                    margin="0 0 0 0"
                    textAlign="left"
                  >
                    <Link
                      to={`/${pageContext.lang}/${item.node.frontmatter.cluster}/${item.node.frontmatter.slug}`}
                    >
                      {`Read more >`}
                    </Link>
                  </Paragraph>
                </Div>
              </Div>
            );
          })}
        </GridContainer>
      </GridContainer>
    </>
  );
};
export const query = graphql`
  query ThankQuery($file_name: String!, $lang: String!) {
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
          banner {
            tagline
            sub_heading
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 1800
                  quality: 100
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
                # fluid(maxWidth: 1800, quality: 100){
                #   ...GatsbyImageSharpFluid_withWebp
                # }
              }
            }
          }
          content {
            title
            message
            button
            articles_title
          }
          social {
            title
            message
            button_text
          }
        }
      }
    }
    featured: allMarkdownRemark(
      limit: 3
      sort: { fields: frontmatter___date, order: DESC }
      filter: {
        frontmatter: { status: { eq: "published" } }
        fields: { lang: { eq: $lang } }
      }
    ) {
      edges {
        node {
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
    posts: allMarkdownRemark(
      limit: 3
      sort: { fields: frontmatter___date, order: DESC }
      filter: {
        frontmatter: { status: { eq: "published" } }
        fields: { lang: { eq: $lang } }
      }
    ) {
      edges {
        node {
          frontmatter {
            author
            date
            image
            title
            excerpt
            featured
            status
            cluster
          }
          fields {
            lang
            slug
          }
        }
      }
    }
  }
`;
export default BaseRender(ThankYou);
