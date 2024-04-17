import React from "react";
import { Link } from "gatsby";
import { H3, H2, H4, Paragraph } from "../Heading";
import { RoundImage, Colors } from "../Styling";
import LazyLoad from "react-lazyload";
import { Div, Grid } from "../Sections";

const Post = ({ item, i, lang }) => {
  return (
    <Div
      key={`${i}-${item.node.frontmatter.title}`}
      display="flex"
      flexDirection="column"
      flexDirection_tablet="column"
      justifyContent="start"
      border="none"
      padding="0 16px"
      style={{ borderRadius: `0px` }}
      minWidth="260px"
      width="100%"
    >
      <Link to={item.node.fields.pagePath}>
        {item.node.frontmatter.image && (
          <LazyLoad
            height={10}
            scroll={true}
            once={true}
            style={{ height: "173px" }}
          >
            <RoundImage
              url={item.node.frontmatter.image}
              bsize="cover"
              border="0px"
              position="center"
              width="100%"
              height="173px"
              height_tablet="173px"
              margin="0 0 0 0"
            />
          </LazyLoad>
        )}

        {/* Titulo */}
        <Div
          marginTop="20px"
          padding_tablet="20px 32px"
          padding_xxs="20px 16px"
          display={`flex`}
          //height="100%"
          height="fit-content"
          flexDirection="column"
          gap="16px"
          boxShadow="inset 0px 0px 5px 0px #0000001A"
        >
          <H3
            textAlign="left"
            width="100%"
            margin="0"
            fontSize_xs="18px"
            fontSize_tablet="28px"
            fontSize_md="28px"
            lineHeight_xs="21.6px"
            lineHeight_tablet="33.6px"
          >
            {item.node.frontmatter.title}
          </H3>

          {/* Comentario acerca del post */}
          <Paragraph
            color={Colors.darkGray}
            textAlign="left"
            margin="10px 0 10px 0"
            fontWeight="400"
            fontSize_xs="14px"
            fontSize_tablet="13px"
            lineHeight_xs="16.8px"
            lineHeight_tablet="26px"
          >
            {item.node.frontmatter.excerpt}
          </Paragraph>
        </Div>
      </Link>
    </Div>
  );
};

const RelatedPosts = ({ posts, lang, relatedClusters }) => {
  const title = {
    us: "Related Articles",
    es: "Artículos Relacionados",
  };
  let articles = [];
  relatedClusters.map((cluster) => {
    articles = articles.concat(
      posts.filter(({ node }) => node.frontmatter.cluster === cluster)
    );
  });

  return (
    articles.length > 0 && (
      <Div
        display="flex"
        flexDirection="column"
        margin="40px 5px"
        margin_tablet="40px auto 20px auto"
        padding_tablet="0 40px"
        padding_md="0 80px"
        padding_lg="0"
        padding="10px 20px"
      >
        <Div
          display="flex"
          flexDirection="column"
          alignItems="left"
          padding_tablet="0px 16px"
          padding="0px 16px"
        >
          <H2
            margin_tablet="0 0 40px 0"
            margin_xs="0px"
            fontSize="21px"
            fontSize_tablet="32px"
            lineHeight="38.4px"
            fontWeight="900"
            color={Colors.darkGray}
            textAlign="center"
          >
            {title[lang]}
          </H2>
        </Div>
        <Grid
          gridTemplateColumns_tablet="repeat(14, 1fr)"
          columns_tablet={articles.length <= 3 ? articles.length : "3"}
          //margin="0 10px 73px 10px"
          margin_tablet="0 auto 84px auto"
          maxWidth_md="1280px"
        >
          <Div
            gridColumn="1/15"
            width="100%"
            className="badge-slider hideOverflowX__"
          >
            {articles.map((item, i) => (
              <Post item={item} i={i} lang={lang} />
            ))}
          </Div>
        </Grid>
      </Div>
    )
  );
};

export default RelatedPosts;
